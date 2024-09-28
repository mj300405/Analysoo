from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import VideoAnalysis
from .tasks import analyze_video
from .serializers import VideoUploadSerializer, VideoAnalysisResultSerializer
import uuid
import os

class VideoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        serializer = VideoUploadSerializer(data=request.data)
        if serializer.is_valid():
            video_file = serializer.validated_data['file']
            analysis_id = str(uuid.uuid4())
            file_name = f"{analysis_id}_{video_file.name}"
            file_path = os.path.join('media/videos', file_name)
            
            with open(file_path, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)

            video_analysis = VideoAnalysis.objects.create(
                id=analysis_id,
                file_name=file_name,
                file_path=file_path,
                status='PENDING'
            )

            analyze_video.delay(analysis_id)

            return Response({"analysis_id": analysis_id}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoAnalysisResultView(APIView):
    def get(self, request, format=None):
        analysis_id = request.query_params.get('id')
        if not analysis_id:
            return Response({"error": "No analysis ID provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            analysis = VideoAnalysis.objects.get(id=analysis_id)
            serializer = VideoAnalysisResultSerializer({
                "status": analysis.status,
                "results": analysis.results if analysis.status == 'COMPLETED' else None
            })
            return Response(serializer.data)
        except VideoAnalysis.DoesNotExist:
            return Response({"error": "Analysis not found"}, status=status.HTTP_404_NOT_FOUND)
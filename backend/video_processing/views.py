import logging
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import VideoAnalysis
from .tasks import analyze_video
from .serializers import VideoUploadSerializer, VideoAnalysisResultSerializer
import uuid
import os

logger = logging.getLogger(__name__)

class VideoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        logger.info("Received video upload request")
        serializer = VideoUploadSerializer(data=request.data)
        if serializer.is_valid():
            video_file = serializer.validated_data['file']
            analysis_id = str(uuid.uuid4())
            file_name = f"{analysis_id}_{video_file.name}"
            
            logger.info(f"Creating directory for video: {file_name}")
            media_dir = os.path.join('media', 'videos')
            os.makedirs(media_dir, exist_ok=True)
            
            file_path = os.path.join(media_dir, file_name)
            
            logger.info(f"Saving video file to: {file_path}")
            with open(file_path, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)

            logger.info("Creating VideoAnalysis object")
            video_analysis = VideoAnalysis.objects.create(
                id=analysis_id,
                file_name=file_name,
                file_path=file_path,
                status='PENDING'
            )

            logger.info(f"Queueing Celery task for analysis_id: {analysis_id}")
            analyze_video.delay(analysis_id)

            logger.info("Video upload successful")
            return Response({"analysis_id": analysis_id}, status=status.HTTP_202_ACCEPTED)
        logger.error(f"Video upload failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoAnalysisResultView(APIView):
    def get(self, request, format=None):
        analysis_id = request.query_params.get('id')
        if not analysis_id:
            logger.error("No analysis ID provided")
            return Response({"error": "No analysis ID provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            logger.info(f"Fetching analysis result for ID: {analysis_id}")
            analysis = VideoAnalysis.objects.get(id=analysis_id)
            serializer = VideoAnalysisResultSerializer({
                "status": analysis.status,
                "results": analysis.results if analysis.status == 'COMPLETED' else None,
                "error_message": analysis.error_message if analysis.status == 'FAILED' else None
            })
            logger.info(f"Analysis status: {analysis.status}")
            return Response(serializer.data)
        except VideoAnalysis.DoesNotExist:
            logger.error(f"Analysis not found for ID: {analysis_id}")
            return Response({"error": "Analysis not found"}, status=status.HTTP_404_NOT_FOUND)
from rest_framework import serializers
from .models import VideoAnalysis

class VideoAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoAnalysis
        fields = ['id', 'file_name', 'status', 'results', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'results', 'created_at', 'updated_at']

class VideoUploadSerializer(serializers.Serializer):
    file = serializers.FileField()

class VideoAnalysisResultSerializer(serializers.Serializer):
    status = serializers.CharField()
    results = serializers.JSONField(allow_null=True)
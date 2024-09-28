from django.urls import path
from .views import VideoUploadView, VideoAnalysisResultView

urlpatterns = [
    path('upload/', VideoUploadView.as_view(), name='upload-video'),
    path('result/', VideoAnalysisResultView.as_view(), name='video-analysis-result'),
]
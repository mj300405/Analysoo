from celery import shared_task
from .models import VideoAnalysis
from .analysis import analyze_video

@shared_task
def analyze_video(analysis_id):
    try:
        video_analysis = VideoAnalysis.objects.get(id=analysis_id)
        video_analysis.status = 'PROCESSING'
        video_analysis.save()

        # Perform the analysis
        results = analyze_video(video_analysis.file_path)

        # Update the database with results
        video_analysis.results = results
        video_analysis.status = 'COMPLETED'
        video_analysis.save()
    except Exception as e:
        video_analysis.status = 'FAILED'
        video_analysis.error_message = str(e)
        video_analysis.save()
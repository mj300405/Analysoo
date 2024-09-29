import logging
from celery import shared_task
from .models import VideoAnalysis
from .analysis import analyze_video as perform_analysis

logger = logging.getLogger(__name__)

@shared_task
def analyze_video(analysis_id):
    logger.info(f"Starting Celery task for analysis_id: {analysis_id}")
    try:
        video_analysis = VideoAnalysis.objects.get(id=analysis_id)
        logger.info(f"Retrieved VideoAnalysis object: {video_analysis.file_name}")
        
        video_analysis.status = 'PROCESSING'
        video_analysis.save()
        logger.info(f"Updated status to PROCESSING for {analysis_id}")

        logger.info(f"Starting analysis for video: {video_analysis.file_name}")
        results = perform_analysis(video_analysis.file_path)
        logger.info(f"Analysis completed for video: {video_analysis.file_name}")

        video_analysis.results = results
        video_analysis.status = 'COMPLETED'
        video_analysis.save()
        logger.info(f"Updated status to COMPLETED for {analysis_id}")
    except VideoAnalysis.DoesNotExist:
        logger.error(f"VideoAnalysis object not found for ID: {analysis_id}")
    except Exception as e:
        logger.error(f"Error during video analysis: {str(e)}", exc_info=True)
        try:
            video_analysis = VideoAnalysis.objects.get(id=analysis_id)
            video_analysis.status = 'FAILED'
            video_analysis.error_message = str(e)
            video_analysis.save()
            logger.info(f"Updated status to FAILED for {analysis_id}")
        except:
            logger.error(f"Failed to update status for {analysis_id}")
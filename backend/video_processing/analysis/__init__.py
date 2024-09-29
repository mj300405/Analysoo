import os
import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from .text_analysis import assess_readability, analyze_text_with_gpt
from .audio_analysis import analyze_speech_quality, transcribe_audio
from .video_analysis import analyze_video_content, extract_audio_from_video
from .utils import compare_texts, clean_json_strings

logger = logging.getLogger(__name__)

def analyze_video(video_path, comparison_text=None):
    logger.info(f"Starting analysis for video: {video_path}")
    
    try:
        # Extract audio from video
        audio_path = video_path.replace('.mp4', '.wav')
        logger.info(f"Extracting audio to: {audio_path}")
        extract_audio_from_video(video_path, audio_path)
        
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"Audio file not created: {audio_path}")

        # Tasks that can be run in parallel
        with ThreadPoolExecutor(max_workers=5) as executor:
            future_transcription = executor.submit(transcribe_audio, audio_path)
            future_video_analysis = executor.submit(analyze_video_content, video_path)
            future_speech_quality = executor.submit(analyze_speech_quality, audio_path)

            # Wait for all tasks to complete
            transcription = future_transcription.result()
            video_analysis = future_video_analysis.result()
            speech_quality = future_speech_quality.result()

        # Tasks that depend on transcription
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_tasks = {
                executor.submit(analyze_text_with_gpt, transcription, task): task
                for task in [
                    "comprehensibility", "sentiment", "key_phrases", "generated_questions",
                    "speaker_identification", "language_detection", "structure_assessment",
                    "target_audience", "speech_errors", "subtitle_quality", "speech_speed",
                    "speech_clarity"
                ]
            }
            future_tasks.update({
                executor.submit(analyze_text_with_gpt, str(video_analysis['facial_expressions']), "facial_expressions"): "facial_expressions",
                executor.submit(analyze_text_with_gpt, str(video_analysis['background']), "background_elements"): "background_elements",
                executor.submit(analyze_text_with_gpt, f"Transcription:\n{transcription}\n\nVideo Analysis:\n{str(video_analysis)}", "overall_impression"): "overall_impression",
                executor.submit(assess_readability, transcription): "readability"
            })

            if comparison_text:
                future_tasks[executor.submit(compare_texts, transcription, comparison_text)] = "text_similarity"

            gpt_analyses = {}
            for future in as_completed(future_tasks):
                task = future_tasks[future]
                try:
                    result = future.result()
                    if task == "readability":
                        readability = result
                    elif task == "text_similarity":
                        text_similarity = result
                    else:
                        gpt_analyses[task] = result
                except Exception as e:
                    logger.error(f"Error in task {task}: {str(e)}")

        results = {
            "transcription": transcription,
            "readability": readability,
            "speech_quality": speech_quality,
            "video_analysis": video_analysis,
            "text_analysis": gpt_analyses
        }

        if comparison_text:
            results["text_similarity"] = text_similarity

        # Clean the results
        cleaned_results = clean_json_strings(results)

        logger.info("Analysis completed successfully")
        return cleaned_results
    except Exception as e:
        logger.error(f"Error during video analysis: {str(e)}", exc_info=True)
        raise
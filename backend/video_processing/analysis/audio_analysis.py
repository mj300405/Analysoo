from pydub import AudioSegment
from pydub.silence import detect_silence
from .openai_utils import call_openai_api
import logging

logger = logging.getLogger(__name__)

def analyze_speech_quality(audio_path):
    """Analyze speech quality (pauses, potential errors)."""
    logger.info(f"Starting speech quality analysis for: {audio_path}")
    try:
        audio = AudioSegment.from_file(audio_path)
        silence_thresh = -40  # dB
        min_silence_len = 500  # ms
        silences = detect_silence(audio, min_silence_len=min_silence_len, silence_thresh=silence_thresh)
        
        total_duration = len(audio)
        total_silence = sum(end - start for start, end in silences)
        speech_ratio = 1 - (total_silence / total_duration)
        
        logger.info("Speech quality analysis completed successfully")
        return {
            "speech_ratio": speech_ratio,
            "pauses": len(silences),
            "average_pause_duration": total_silence / len(silences) if silences else 0
        }
    except Exception as e:
        logger.error(f"Error in speech quality analysis: {str(e)}", exc_info=True)
        raise

def transcribe_audio(audio_path):
    """Transcribe audio using OpenAI's Whisper API."""
    logger.info(f"Starting audio transcription for: {audio_path}")
    try:
        transcription = call_openai_api("whisper", audio_path)
        logger.info("Audio transcription completed successfully")
        return transcription
    except Exception as e:
        logger.error(f"Error in audio transcription: {str(e)}", exc_info=True)
        raise
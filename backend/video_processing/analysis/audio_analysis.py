from pydub import AudioSegment
from pydub.silence import detect_silence
from .openai_utils import call_openai_api

def analyze_speech_quality(audio_path):
    """Analyze speech quality (pauses, potential errors)."""
    audio = AudioSegment.from_file(audio_path)
    silence_thresh = -40  # dB
    min_silence_len = 500  # ms
    silences = detect_silence(audio, min_silence_len=min_silence_len, silence_thresh=silence_thresh)
    
    total_duration = len(audio)
    total_silence = sum(end - start for start, end in silences)
    speech_ratio = 1 - (total_silence / total_duration)
    
    return {
        "speech_ratio": speech_ratio,
        "pauses": len(silences),
        "average_pause_duration": total_silence / len(silences) if silences else 0
    }

def transcribe_audio(audio_path):
    """Transcribe audio using OpenAI's Whisper API."""
    with open(audio_path, "rb") as audio_file:
        return call_openai_api("whisper", audio_file)
from .text_analysis import assess_readability, analyze_text_with_gpt
from .audio_analysis import analyze_speech_quality, transcribe_audio
from .video_analysis import analyze_video_content
from .utils import compare_texts

def analyze_video(video_path, comparison_text=None):
    audio_path = video_path.replace('.mp4', '.wav')  # Assuming audio has been extracted
    
    transcription = transcribe_audio(audio_path)
    video_analysis = analyze_video_content(video_path)
    
    gpt_analyses = {
        "comprehensibility": analyze_text_with_gpt(transcription, "comprehensibility"),
        "sentiment": analyze_text_with_gpt(transcription, "sentiment"),
        "key_phrases": analyze_text_with_gpt(transcription, "key_phrases"),
        "generated_questions": analyze_text_with_gpt(transcription, "generated_questions"),
        "speaker_identification": analyze_text_with_gpt(transcription, "speaker_identification"),
        "language_detection": analyze_text_with_gpt(transcription, "language_detection"),
        "structure_assessment": analyze_text_with_gpt(transcription, "structure_assessment"),
        "target_audience": analyze_text_with_gpt(transcription, "target_audience"),
        "speech_errors": analyze_text_with_gpt(transcription, "speech_errors"),
        "subtitle_quality": analyze_text_with_gpt(transcription, "subtitle_quality")
    }
    
    results = {
        "transcription": transcription,
        "readability": assess_readability(transcription),
        "speech_quality": analyze_speech_quality(audio_path),
        "video_analysis": video_analysis,
        "text_analysis": gpt_analyses
    }
    
    if comparison_text:
        results["text_similarity"] = compare_texts(transcription, comparison_text)
    
    return results
import cv2
import numpy as np
import mediapipe as mp
from deepface import DeepFace
import logging
from moviepy.editor import VideoFileClip

logger = logging.getLogger(__name__)

mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def extract_audio_from_video(video_path, audio_path):
    """Extract audio from video file."""
    logger.info(f"Extracting audio from {video_path} to {audio_path}")
    try:
        video = VideoFileClip(video_path)
        video.audio.write_audiofile(audio_path)
        logger.info("Audio extraction completed successfully")
    except Exception as e:
        logger.error(f"Error extracting audio: {str(e)}", exc_info=True)
        raise

def analyze_video_content(video_path):
    """Analyze facial expressions, gestures, and movement in the video."""
    logger.info(f"Starting video content analysis for: {video_path}")
    try:
        cap = cv2.VideoCapture(video_path)
        
        face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.5)
        pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)
        
        emotions = []
        gestures = []
        movements = []
        background_elements = []
        
        frame_count = 0
        while cap.isOpened():
            success, image = cap.read()
            if not success:
                break
            
            frame_count += 1
            if frame_count % 100 == 0:
                logger.info(f"Processed {frame_count} frames")
            
            # Facial expression analysis
            try:
                result = DeepFace.analyze(image, actions=['emotion'], enforce_detection=False)
                emotions.append(result[0]['emotion'])
            except Exception as e:
                logger.warning(f"Error in facial expression analysis for frame {frame_count}: {str(e)}")
            
            # Gesture and movement analysis
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            face_results = face_mesh.process(image_rgb)
            pose_results = pose.process(image_rgb)
            
            if face_results.multi_face_landmarks:
                gestures.append("Face detected")
            
            if pose_results.pose_landmarks:
                movements.append("Body movement detected")
            
            # Background analysis (simplified)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            edges = cv2.Canny(gray, 50, 150)
            contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            background_elements.append(len(contours))
        
        cap.release()
        
        # Aggregate results
        avg_emotions = {emotion: np.mean([frame[emotion] for frame in emotions]) for emotion in emotions[0]} if emotions else {}
        gesture_summary = max(set(gestures), key=gestures.count) if gestures else "No significant gestures detected"
        movement_summary = max(set(movements), key=movements.count) if movements else "No significant movements detected"
        avg_background_complexity = np.mean(background_elements) if background_elements else 0
        
        logger.info("Video content analysis completed successfully")
        return {
            "facial_expressions": {
                "emotions": avg_emotions,
                "dominant_emotion": max(avg_emotions, key=avg_emotions.get) if avg_emotions else "Unknown"
            },
            "gestures": gesture_summary,
            "movements": movement_summary,
            "background": {
                "complexity": avg_background_complexity,
                "assessment": "Complex" if avg_background_complexity > 100 else "Simple"
            }
        }
    except Exception as e:
        logger.error(f"Error in video content analysis: {str(e)}", exc_info=True)
        raise
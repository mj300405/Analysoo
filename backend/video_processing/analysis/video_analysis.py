import cv2
import numpy as np
import mediapipe as mp
from deepface import DeepFace

mp_face_mesh = mp.solutions.face_mesh
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def analyze_video_content(video_path):
    """Analyze facial expressions, gestures, and movement in the video."""
    cap = cv2.VideoCapture(video_path)
    
    face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=1, min_detection_confidence=0.5)
    pose = mp_pose.Pose(static_image_mode=False, min_detection_confidence=0.5, min_tracking_confidence=0.5)
    
    emotions = []
    gestures = []
    movements = []
    
    while cap.isOpened():
        success, image = cap.read()
        if not success:
            break
        
        # Facial expression analysis
        try:
            result = DeepFace.analyze(image, actions=['emotion'], enforce_detection=False)
            emotions.append(result[0]['emotion'])
        except:
            pass
        
        # Gesture and movement analysis
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        face_results = face_mesh.process(image_rgb)
        pose_results = pose.process(image_rgb)
        
        if face_results.multi_face_landmarks:
            gestures.append("Face detected")
        
        if pose_results.pose_landmarks:
            movements.append("Body movement detected")
    
    cap.release()
    
    # Aggregate results
    avg_emotions = {emotion: np.mean([frame[emotion] for frame in emotions]) for emotion in emotions[0]} if emotions else {}
    gesture_summary = max(set(gestures), key=gestures.count) if gestures else "No significant gestures detected"
    movement_summary = max(set(movements), key=movements.count) if movements else "No significant movements detected"
    
    return {
        "emotions": avg_emotions,
        "gestures": gesture_summary,
        "movements": movement_summary
    }
import cv2
from PIL import Image
import numpy as np
import os

def capture_image(save_path="uploads/captured_image.jpg"):
    """Captures an image from the webcam and saves it."""

    # Open webcam (0 -> default camera)
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("❌ Error: Could not access the camera")
        return None

    ret, frame = cap.read()  # Capture frame

    # Release camera immediately after capturing
    cap.release()

    if not ret or frame is None:
        print("❌ Error: Could not capture an image")
        return None

    # Convert BGR to RGB (since OpenCV uses BGR and PIL uses RGB)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image = Image.fromarray(frame)

    # Ensure the directory exists before saving
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    # Save the captured image
    image.save(save_path)
    print(f"✅ Image captured and saved at: {save_path}")
    
    return save_path

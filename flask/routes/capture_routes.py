from flask import Blueprint, jsonify
from servises.camera_service import capture_image

capture_bp = Blueprint("capture", __name__)

@capture_bp.route("/capture", methods=["GET"])
def capture():
    """Captures an image using the webcam."""
    image_path = capture_image()
    if image_path:
        return jsonify({"image_path": image_path})
    return jsonify({"error": "Failed to capture image"}), 500

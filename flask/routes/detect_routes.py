from flask import Blueprint, request, jsonify
from servises.ai_service import count_objects

detect_bp = Blueprint("detect", __name__)

@detect_bp.route("/detect", methods=["GET"])
def detect_objects():
    """Processes an image and returns detected object details."""
    image_url = request.args.get("image_url")  # Get image URL from query params
    if not image_url:
        return jsonify({"error": "Missing image_url parameter"}), 400

    detection_result = count_objects(image_url)
    
    return jsonify({
        "detection_result": detection_result
    })

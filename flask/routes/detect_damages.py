# from flask import Blueprint, request, jsonify
# from servises.ai_damage import count_objects_damage
# # from config import db

# detect_bp_damage = Blueprint("detect_damage", __name__)

# @detect_bp_damage.route("/detect_damage", methods=["POST"])
# def detect():
#     """Detects fresh and damaged fruits in an image."""
#     data = request.json
#     image_url = data.get("image_url")

#     if not image_url:
#         return jsonify({"error": "Missing image_url parameter"}), 400

#     detection_result = count_objects_damage(image_url)

#     if not detection_result:
#         return jsonify({"error": "No fruits detected"}), 400

#     return jsonify({"detections": detection_result})


from flask import Blueprint, request, jsonify
from servises.ai_damage import count_damaged_fruits

detect_bp_damage = Blueprint("detect_damage", __name__)

@detect_bp_damage.route("/detect_damage", methods=["GET"])
def detect_objects():
    """Processes an image and returns detected object details."""
    image_url = request.args.get("image_url")  # Get image URL from query params
    if not image_url:
        return jsonify({"error": "Missing image_url parameter"}), 400

    detection_result = count_damaged_fruits(image_url)
    
    return jsonify({
        "detection_result": detection_result
    })

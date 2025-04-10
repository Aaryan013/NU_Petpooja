from flask import Blueprint, request, jsonify
from servises.cloudinary_service import upload_image_to_cloudinary

upload_bp_damage = Blueprint("upload_damage", __name__)

@upload_bp_damage.route("/upload_damage", methods=["POST"])
def upload():
    """Uploads an image and returns its Cloudinary URL."""
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    cloudinary_url = upload_image_to_cloudinary(image)

    return jsonify({"cloudinary_url": cloudinary_url})

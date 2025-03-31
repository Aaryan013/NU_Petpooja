import cloudinary
import cloudinary.uploader
import os

# Load environment variables
CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
CLOUD_API_KEY = os.getenv("CLOUDINARY_API_KEY")
CLOUD_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

# Configure Cloudinary
cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=CLOUD_API_KEY,
    api_secret=CLOUD_API_SECRET
)

def upload_image_to_cloudinary(image):
    """Uploads an image to Cloudinary and returns its URL."""
    response = cloudinary.uploader.upload(image)
    return response.get("secure_url")

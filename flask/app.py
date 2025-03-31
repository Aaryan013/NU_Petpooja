from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os



# Load environment variables
load_dotenv()

# Import API routes
from routes.capture_routes import capture_bp
from routes.upload_routes import upload_bp
from routes.detect_routes import detect_bp
from routes.capture_damages import capture_bp_damage
from routes.upload_damages import upload_bp_damage
from routes.detect_damages import detect_bp_damage


# Create Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True)
# Register Blueprints (API routes)
app.register_blueprint(capture_bp)
app.register_blueprint(upload_bp)
app.register_blueprint(detect_bp)

app.register_blueprint(capture_bp_damage)
app.register_blueprint(upload_bp_damage)
app.register_blueprint(detect_bp_damage)

if __name__ == "__main__":
    app.run(debug=True)

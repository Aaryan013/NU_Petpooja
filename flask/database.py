from pymongo import MongoClient
from config import Config

# ✅ Connect to MongoDB
client = MongoClient(Config.MONGO_URI)
db = client["fruit_detection"]
collection = db["detections"]

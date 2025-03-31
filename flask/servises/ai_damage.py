import google.generativeai as genai
import requests
from PIL import Image
from io import BytesIO
import re
from config import Config

# ✅ Configure Gemini AI
genai.configure(api_key=Config.GEMINI_API_KEY)

def count_damaged_fruits(image_url):
    """Downloads an image and uses Gemini AI to detect & count damaged fruits with their total weight."""
    try:
        print(f"🔄 Fetching image from: {image_url}")  # Debugging

        response = requests.get(image_url)
        response.raise_for_status()  # Raise error for invalid responses
        
        image = Image.open(BytesIO(response.content))
        print("✅ Image successfully loaded.")

        # ✅ Load Gemini AI model
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = """
        Analyze the image and detect only damaged fruits.  
        For each damaged fruit, provide the count and estimated total weight (in kg).  
        Use the following format strictly, without any extra text:

        Fruit - Count - Total Weight (kg)

        Example:
        Apple - 3 - 0.45  
        Banana - 2 - 0.30  
        Mango - 1 - 0.50  

        Ensure the weight is calculated based on realistic fruit sizes.
        """

        ai_response = model.generate_content([image, prompt])

        # ✅ Print AI response to check its format
        print("📢 AI Response:", ai_response.text if hasattr(ai_response, "text") else "No response")

        if not ai_response or not hasattr(ai_response, "text") or not ai_response.text:
            return {"message": "No response from AI."}

        # ✅ Extract fruit name, count, and weight using regex
        pattern = r"([A-Za-z\s]+) - (\d+) - ([\d.]+)"
        matches = re.findall(pattern, ai_response.text.strip())

        items = [
            {"name": name.strip(), "count": int(count), "total_weight_kg": float(weight)}
            for name, count, weight in matches
        ]

        if not items:
            return {"message": "No damaged fruits detected."}

        print("✅ Extracted Data:", items)  # Debugging

        return items

    except requests.exceptions.RequestException as e:
        print(f"❌ Image fetch error: {str(e)}")  # Debugging
        return {"error": f"Failed to fetch image: {str(e)}"}
    except Exception as e:
        print(f"❌ AI processing error: {str(e)}")  # Debugging
        return {"error": f"AI processing error: {str(e)}"}

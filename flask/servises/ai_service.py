import google.generativeai as genai
import requests
from PIL import Image
from io import BytesIO
import re
from config import Config

# ✅ Configure Gemini AI
genai.configure(api_key=Config.GEMINI_API_KEY)

def count_objects(image_url):
    """Downloads an image and uses Gemini AI to detect & count only fruits and vegetables."""
    try:
        response = requests.get(image_url)
        response.raise_for_status()  # Raise error for invalid responses
        
        image = Image.open(BytesIO(response.content))

        # ✅ Load Gemini AI model
        model = genai.GenerativeModel("gemini-1.5-flash")

        prompt = """
        Detect and count only fruits and vegetables in the image.
        Return the output strictly in this format:
        
        Apple - 3
        Banana - 5
        Carrot - 2
        
        Do NOT include any extra text.
        """

        ai_response = model.generate_content([image, prompt])

        if not ai_response or not hasattr(ai_response, "text") or not ai_response.text:
            return {"error": "No response from AI."}

        # ✅ Extract only the count of fruits & vegetables using regex
        pattern = r"([A-Za-z\s]+) - (\d+)"
        matches = re.findall(pattern, ai_response.text.strip())

        items = [{"name": name.strip(), "count": int(count)} for name, count in matches]

        return items if items else {"error": "No fruits or vegetables detected."}

    except requests.exceptions.RequestException as e:
        return {"error": f"Failed to fetch image: {str(e)}"}
    except Exception as e:
        return {"error": f"AI processing error: {str(e)}"}

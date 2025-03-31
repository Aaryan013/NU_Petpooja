import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";  // Default to localhost if undefined

export const captureImage = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/capture`);
        return response.data;
    } catch (error) {
        console.error("❌ Capture Image Error:", error.message);
        return { error: "Failed to capture image" };
    }
};

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);
    
        const response = await axios.post(`${BASE_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("❌ Upload Image Error:", error.message);
        return { error: "Failed to upload image" };
    }
};
export const detectObjects = async (imageUrl) => {
    try {
        const response = await axios.get(`${BASE_URL}/detect?image_url=${encodeURIComponent(imageUrl)}`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // Add this if using cookies/sessions
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("❌ Detect Objects Error (Response):", error.response.data);
        } else if (error.request) {
            console.error("❌ Detect Objects Error (No Response):", error.request);
        } else {
            console.error("❌ Detect Objects Error (Message):", error.message);
        }
        return { error: "Detection failed" };
    }
};

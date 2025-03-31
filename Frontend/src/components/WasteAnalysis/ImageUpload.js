import React, { useState } from "react";
import { uploadImage } from "./api";
import { CloudUpload, Loader2 } from "lucide-react"; // ✅ Icons

const ImageUpload = ({ onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);

        try {
            const response = await uploadImage(selectedFile);
            onUpload(response.cloudinary_url);
        } catch (error) {
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 flex flex-col items-center space-y-4 border border-gray-200">
            {/* 📷 File Input */}
            <label className="flex flex-col items-center w-full p-5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <CloudUpload className="w-10 h-10 text-gray-500 mb-2" />
                <span className="text-gray-600 text-sm">Click to select an image</span>
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>

            {/* 🏷️ Selected File Name */}
            {selectedFile && (
                <p className="text-gray-700 text-sm font-medium">{selectedFile.name}</p>
            )}

            {/* 🚀 Upload Button */}
            <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isUploading ? <Loader2 className="animate-spin w-5 h-5" /> : <CloudUpload className="w-5 h-5" />}
                {isUploading ? "Uploading..." : "Upload Image"}
            </button>
        </div>
    );
};

export default ImageUpload;

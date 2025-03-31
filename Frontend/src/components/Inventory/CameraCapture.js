import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { captureImage } from "./api";

const CameraCapture = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const handleCapture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        onCapture(imageSrc);
    };

    return (
        <div>
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={handleCapture}>Capture Image</button>
            {capturedImage && <img src={capturedImage} alt="Captured" />}
        </div>
    );
};

export default CameraCapture;

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Camera, Image } from "@mui/icons-material";
import ImageUpload from "./ImageUpload";
import DetectionResult from "./DetectionResult";
import CameraCapture from "./CameraCapture";
import Sidebar from "../common/Sidebar";

const WasteAnalysis = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [captureMode, setCaptureMode] = useState(null);

  const handleImageUpload = async (url) => {
    setImageUrl(url);
    setDialogOpen(false);
  };

  const openDialog = (mode) => {
    setCaptureMode(mode);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Fruit & Vegetable Waste Analysis
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Image />}
            onClick={() => openDialog("upload")}
          >
            Upload Image
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Camera />}
            onClick={() => openDialog("camera")}
          >
            Live Capture
          </Button>
        </Box>

        {/* ✅ Render DetectionResult only when an image is uploaded */}
        {imageUrl && <DetectionResult imageUrl={imageUrl} />}
      </Box>

      {/* Dialog for Image Upload or Camera Capture */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{captureMode === "upload" ? "Upload Image" : "Live Capture"}</DialogTitle>
        <DialogContent>
          {captureMode === "upload" ? (
            <ImageUpload onUpload={handleImageUpload} />
          ) : (
            <CameraCapture onCapture={handleImageUpload} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WasteAnalysis;

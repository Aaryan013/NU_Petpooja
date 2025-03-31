// import React, { useState } from "react";

// import ImageUpload from "./ImageUpload";
// import DetectionResult from "./DetectionResult";
// import { detectObjects } from "./api";

// const Inventory = () => {
//     const [imageUrl, setImageUrl] = useState(null);
//     const [detectionResult, setDetectionResult] = useState("");

//     const handleImageUpload = async (url) => {
//         setImageUrl(url);
//         const result = await detectObjects(url);
//         setDetectionResult(result.detection_result);
//     };

//     return (
//         <div>
//             <h1>Fruit & Vegetable Detection</h1>
//             {/* <CameraCapture onCapture={handleImageUpload} /> */}
//             <ImageUpload onUpload={handleImageUpload} />
//             <DetectionResult result={detectionResult} imageUrl={imageUrl} />
//         </div>
//     );
// };

// export default Inventory;

import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Camera, Image, Menu, Dashboard as DashboardIcon, Settings } from "@mui/icons-material";
import ImageUpload from "./ImageUpload";
import DetectionResult from "./DetectionResult";
import CameraCapture from "./CameraCapture";
import { detectObjects } from "./api";
import Sidebar from "../common/Sidebar";

const Inventory = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [detectionResult, setDetectionResult] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [captureMode, setCaptureMode] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleImageUpload = async (url) => {
    setImageUrl(url);
    setDialogOpen(false); // Close pop-up after upload
    const result = await detectObjects(url);
    setDetectionResult(result.detection_result);
  };

  const openDialog = (mode) => {
    setCaptureMode(mode);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      < Sidebar/>
      

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, textAlign: "center" }}>
        
        <Typography variant="h4" gutterBottom>
          Fruit & Vegetable Detection
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button variant="contained" color="primary" startIcon={<Image />} onClick={() => openDialog("upload")}>
            Upload Image
          </Button>
          <Button variant="contained" color="secondary" startIcon={<Camera />} onClick={() => openDialog("camera")}>
            Live Capture
          </Button>
        </Box>

        {/* Show detection result only after image is selected */}
        {imageUrl && <DetectionResult result={detectionResult} imageUrl={imageUrl} />}
      </Box>

      {/* Dialog for Image Upload or Camera Capture */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{captureMode === "upload" ? "Upload Image" : "Live Capture"}</DialogTitle>
        <DialogContent>
          {captureMode === "upload" ? <ImageUpload onUpload={handleImageUpload} /> : <CameraCapture onCapture={handleImageUpload} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Inventory;

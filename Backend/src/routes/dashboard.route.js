import express from 'express';
import {
  fetchSalesData,
  addOrUpdateSalesData,
  removeSalesData,
  getSalesMetrics,
  getSalesChange,
} from '../controllers/dashboard.controller.js';

const router = express.Router();
const basePath = '/api/v1';

// Define routes
router.get(`/sales`, fetchSalesData);
router.post(`/sales`, addOrUpdateSalesData);
router.delete(`/sales/:date`, removeSalesData);
router.get(`/sales/metrics`, getSalesMetrics);
router.get(`/sales/change`, getSalesChange);

export default router;
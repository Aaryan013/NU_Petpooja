import express from 'express';
import * as menuController from '../controllers/MenuOptimization.controllers.js';
import { protect } from '../controllers/MenuOptimization.controllers.js';

const router = express.Router();

// Protect all routes after this middleware
// router.use(protect);

router
  .route('/')
  .get(menuController.getAllMenuItems)
  .post(menuController.createMenuItem);

router
  .route('/:name')
  .get(menuController.getMenuItem)
  .patch(menuController.updateMenuItem)
  .delete(menuController.deleteMenuItem);

// New route for updating metrics
router.route('/metrics/update')
  .patch(menuController.updateMetrics);

export default router;
import { Router } from 'express';
import { DashboardController } from '../../controllers/dashboard/dashboard.controller';

const router = Router();
const dashboardController = new DashboardController();

router.get('/totals', dashboardController.totals);

export default router;

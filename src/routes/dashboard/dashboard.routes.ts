import { Router } from 'express';
import { DashboardController } from '../../controllers/dashboard/dashboard.controller';
import { DashboardRepository } from '~/repositories/dashboard/dashboard.repository';

const router = Router();
const dashboardRepository = new DashboardRepository();
const dashboardController = new DashboardController(dashboardRepository);

router.get('/totals', dashboardController.totals);

export default router;

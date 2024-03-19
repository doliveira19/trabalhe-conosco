import { Request, Response } from 'express';
import { DashboardRepository } from '~/repositories/dashboard/dashboard.repository';
import { DashboardService } from '~/services/dashboard/dashboard.service';

export class DashboardController {

  dashboardService: DashboardService;

  constructor(dashboardRepository: DashboardRepository) {
    this.dashboardService = new DashboardService(dashboardRepository);
  }

  totals = async (req: Request, res: Response) => {

    const totalsResp = await this.dashboardService.totals();
    res.status(200).send(totalsResp || {});
  };

};

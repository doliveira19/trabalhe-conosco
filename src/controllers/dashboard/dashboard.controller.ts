import { Request, Response } from 'express';
import { DashboardRepository } from '~/repositories/dashboard/dashboard.repository';
import { DashboardService } from '~/services/dashboard/dashboard.service';

export class DashboardController {

  dashboardRepository = new DashboardRepository();
  dashboardService = new DashboardService(this.dashboardRepository);

  async totals(req: Request, res: Response) {

    const totalsResp = await this.dashboardService.totals();
    res.status(200).send(totalsResp || {});
  };

};

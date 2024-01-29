import { Request, Response } from 'express';
import { dashboardService } from '~/services/dashboard/dashboard.service';

export class DashboardController {

  totals = async (req: Request, res: Response) => {

    const totalsResp = await dashboardService.totals();
    res.status(200).send(totalsResp || {});
  };

};

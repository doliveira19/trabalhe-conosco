import { DashboardTotalsDTO } from "~/dtos/dashboard/dashboard.total.dto";
import { DashboardRepository } from "~/repositories/dashboard/dashboard.repository";

export class DashboardService {

  constructor(
    private dashboardRepository: DashboardRepository
  ) { }

  totals = async (): Promise<DashboardTotalsDTO> => {

    return await this.dashboardRepository.totals();

  };

}

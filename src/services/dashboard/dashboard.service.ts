import { DashboardRepository } from "~/repositories/dashboard/dashboard.repository";

export class DashboardService {

  constructor(
    private dashboardRepository: DashboardRepository
  ) { }

  async totals() {

    return await this.dashboardRepository.totals();

  };

}

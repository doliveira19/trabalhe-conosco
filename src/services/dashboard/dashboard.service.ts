import { DashboardRepository } from "~/repositories/dashboard/dashboard.repository";

class DashboardService {

  constructor(
    private dashboardRepository: DashboardRepository
  ) { }

  totals = async () => {

    return await this.dashboardRepository.totals();

  };

}

export const dashboardService = new DashboardService(new DashboardRepository());
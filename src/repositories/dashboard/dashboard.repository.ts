import { DashboardTotalsDTO } from "~/dtos/dashboard/dashboard.total.dto";
import prisma from "~/orm/prisma";

export class DashboardRepository {

  totalFarmsQuantity: number = 0;
  farmsTotalArea: number = 0;
  farmsByState: any = [];
  totalArableArea: number = 0;
  totalVegetationArea: number = 0;

  totals = async (): Promise<DashboardTotalsDTO> => {

    const [totalFazendas, farmsTotalArea, farmsByState, totalArableArea, totalVegetationArea] = await prisma.$transaction([

      // total de fazendas
      prisma.producer.count(),

      // area total de fazendas
      prisma.producer.aggregate({
        _sum: {
          farmTotalArea: true,
        },
      }),

      // fazendas por estado
      prisma.producer.groupBy({
        by: ["state"],
        _sum: {
          farmTotalArea: true,
        },
        _count: true,
        orderBy: {
          state: 'asc',
        }
      }),

      // area agricultavel
      prisma.producer.aggregate({
        _sum: {
          farmArableTotal: true,
        },
      }),

      // area vegetação
      prisma.producer.aggregate({
        _sum: {
          farmVegetationArea: true,
        },
      }),

    ])

    this.totalFarmsQuantity = totalFazendas;
    this.farmsTotalArea = Number(farmsTotalArea._sum.farmTotalArea);
    this.totalArableArea = Number(totalArableArea._sum.farmArableTotal);
    this.totalVegetationArea = Number(totalVegetationArea._sum.farmVegetationArea);

    this.farmsByState = farmsByState.map((state) => {
      return {
        state: state.state,
        area: state._sum?.farmTotalArea,
        qty: state._count
      }
    });

    return {
      totalFarmsQuantity: this.totalFarmsQuantity,
      farmsTotalArea: this.farmsTotalArea,
      farmsByState: this.farmsByState,
      totalArableArea: this.totalArableArea,
      totalVegetationArea: this.totalVegetationArea,
    }

  };

}
import prisma from "~/services/prisma";

export class DashboardRepository {

  qtyTotalFazendas: number = 0;
  areaTotalFazendas: number = 0;
  fazendasPorEstado: any = [];
  totaldeCulturas: any = [];
  areaTotalAgricultavel: any = {};
  areaTotalVegetacao: any = {};

  totals = async () => {

    const [totalFazendas, areaTotalFazendas, fazendasPorEstado, areaAgricultavel, areaVegetacao, totalDeCulturas] = await prisma.$transaction([

      // total de fazendas
      prisma.produtor.count(),

      // area total de fazendas
      prisma.produtor.aggregate({
        _sum: {
          areaTotalFazenda: true,
        },
      }),

      // fazendas por estado
      prisma.produtor.groupBy({
        by: ["estado"],
        _sum: {
          areaTotalFazenda: true,

        },
        _count: true,
        orderBy: {
          estado: 'asc',
        }
      }),

      // area agricultavel
      prisma.produtor.aggregate({
        _sum: {
          areaAgricultavelFazenda: true,
        },
      }),

      // area vegetação
      prisma.produtor.aggregate({
        _sum: {
          areaVegetacaoFazenda: true,
        },
      }),

      // area culturas
      prisma.produtor.groupBy({
        by: ["culturasFazenda"],
        _sum: {
          areaAgricultavelFazenda: true,
        },
        _count: true,
        orderBy: {
          culturasFazenda: 'asc'
        },
      })

    ])

    this.qtyTotalFazendas = totalFazendas;
    this.areaTotalFazendas = Number(areaTotalFazendas._sum.areaTotalFazenda);
    this.areaTotalAgricultavel = Number(areaAgricultavel._sum.areaAgricultavelFazenda);
    this.areaTotalVegetacao = Number(areaVegetacao._sum.areaVegetacaoFazenda);

    this.fazendasPorEstado = fazendasPorEstado.map((estado) => {
      return {
        estado: estado.estado,
        area: estado._sum?.areaTotalFazenda,
        qty: estado._count
      }
    });

    this.totaldeCulturas = totalDeCulturas.map((cultura) => {
      return {
        cultura: cultura.culturasFazenda,
        area: cultura._sum?.areaTotalFazenda,
        qty: cultura._count
      }
    });

    return {
      qtyTotalFazendas: this.qtyTotalFazendas,
      areaTotalFazendas: this.areaTotalFazendas,
      fazendasPorEstado: this.fazendasPorEstado,
      totalDeCulturas: this.totaldeCulturas,
      areaTotalAgricultavel: this.areaTotalAgricultavel,
      areaTotalVegetacao: this.areaTotalVegetacao
    }

  };

}
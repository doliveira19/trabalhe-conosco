type farmsByState = {
  state: string,
  area: number,
  qty: number
}

export interface DashboardTotalsDTO {
  totalFarmsQuantity: number,
  farmsTotalArea: number,
  farmsByState: farmsByState[],
  totalArableArea: {},
  totalVegetationArea: {},
}
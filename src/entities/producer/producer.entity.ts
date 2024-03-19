import { Decimal } from "@prisma/client/runtime"

export interface ProducerEntity {
  id: number
  name: string
  document: string
  farmName: string
  city: string
  state: string
  farmTotalArea: Decimal
  farmArableTotal: Decimal
  farmVegetationArea: Decimal
  farmCrops: string[]
  createdAt: Date
  updatedAt: Date | null
}

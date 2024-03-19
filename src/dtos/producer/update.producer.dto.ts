export interface UpdateProducerDTO {
  idProducer: number
  name?: string
  document?: string
  farmName?: string
  city?: string
  state?: string
  farmTotalArea?: number
  farmArableTotal?: number
  farmVegetationArea?: number
  farmCrops?: string[]
}

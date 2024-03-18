export interface ProducerDTO {
  id: number
  name: string
  document: string
  farmName: string
  city: string
  state: string
  farmTotalArea: number
  farmArableTotal: number
  farmVegetationArea: number
  farmCrops: string[]
}

export interface ICreateProducer {
  name: string
  document: string
  farmName: string
  city: string
  state: string
  farmTotalArea: number
  farmArableTotal: number
  farmVegetationArea: number
  farmCrops: string[]
}

export interface IUpdateProducer {
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

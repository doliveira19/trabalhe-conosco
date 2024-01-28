export interface ProdutorDTO {
  id: number
  documento: string
  nome: string
  nomeFazenda: string
  cidade: string
  estado: string
  areaTotalFazenda: number
  areaAgricultavelFazenda: number
  areaVegetacaoFazenda: number
  culturasFazenda: string[]
}

export interface ICreateProdutor {
  nome: string
  documento: string
  nomeFazenda: string
  cidade: string
  estado: string
  areaTotalFazenda: number
  areaAgricultavelFazenda: number
  areaVegetacaoFazenda: number
  culturasFazenda: string[]
}

export interface IUpdateProdutor {
  idProdutor: number
  nome?: string
  nomeFazenda?: string
  cidade?: string
  estado?: string
  areaTotalFazenda?: number
  areaAgricultavelFazenda?: number
  areaVegetacaoFazenda?: number
  culturasFazenda?: string[]
}

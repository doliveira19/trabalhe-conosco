import { ICreateProdutor, IUpdateProdutor } from "~/entities/produtor/produtor.entity";
import { ProdutorRepository } from "~/repositories/produtor/produtor.repository";

class ProdutorService {

  constructor(
    private produtorRepository: ProdutorRepository
  ) { }

  getAllProdutores = async () => {

    return await this.produtorRepository.getAllProdutores();

  };

  getProdutor = async (idProdutor: number) => {

    return await this.produtorRepository.getProdutor(idProdutor);

  };

  createProdutor = async (data: ICreateProdutor) => {

    return await this.produtorRepository.createProdutor(data);

  };

  updateProdutor = async (data: IUpdateProdutor) => {

    return await this.produtorRepository.updateProdutor(data);

  };

  deleteProdutor = async (idProdutor: number) => {

    return await this.produtorRepository.deleteProdutor(idProdutor);

  };

}

export const produtorService = new ProdutorService(new ProdutorRepository);
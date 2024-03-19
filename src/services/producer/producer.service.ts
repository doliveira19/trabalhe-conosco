import { CreateProducerDTO } from "~/dtos/producer/create.producer.dto";
import { UpdateProducerDTO } from "~/dtos/producer/update.producer.dto";
import { ProducerEntity } from "~/entities/producer/producer.entity";
import { ProducerRepository } from "~/repositories/producer/producer.repository";

export class ProducerService {

  constructor(
    private producerRepository: ProducerRepository
  ) { }

  getAllProducers = async (): Promise<ProducerEntity[] | []> => {

    return await this.producerRepository.getAllProducers();

  };

  getProducer = async (idProducer: number): Promise<ProducerEntity> => {

    return await this.producerRepository.getProducer(idProducer);

  };

  createProducer = async (data: CreateProducerDTO): Promise<ProducerEntity> => {

    return await this.producerRepository.createProducer(data);

  };

  updateProducer = async (data: UpdateProducerDTO): Promise<ProducerEntity | null> => {

    return await this.producerRepository.updateProducer(data);

  };

  deleteProducer = async (idProducer: number): Promise<string> => {

    return await this.producerRepository.deleteProducer(idProducer);

  };

}

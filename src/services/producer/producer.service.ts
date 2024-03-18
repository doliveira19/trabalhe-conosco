import { ICreateProducer, IUpdateProducer } from "~/entities/producer/producer.entity";
import { ProducerRepository } from "~/repositories/producer/producer.repository";

export class ProducerService {

  constructor(
    private producerRepository: ProducerRepository
  ) { }

  async getAllProducers() {

    return await this.producerRepository.getAllProducers();

  };

  async getProducer(idProducer: number) {

    return await this.producerRepository.getProducer(idProducer);

  };

  async createProducer(data: ICreateProducer) {

    return await this.producerRepository.createProducer(data);

  };

  async updateProducer(data: IUpdateProducer) {

    return await this.producerRepository.updateProducer(data);

  };

  async deleteProducer(idProducer: number) {

    return await this.producerRepository.deleteProducer(idProducer);

  };

}

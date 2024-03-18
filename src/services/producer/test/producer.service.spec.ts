import AppErrorHandler from '~/errorHandler/appErrorHandler';

import prisma from '~/orm/prisma';
import { ProducerRepository } from '~/repositories/producer/producer.repository';
import { ProducerService } from '../producer.service';

describe('Should test ProducerService', () => {

  let reqCreateProducer;
  const producerRepository = new ProducerRepository();
  const producerService = new ProducerService(producerRepository);

  beforeAll(async () => {

    await prisma.producer.deleteMany();
    reqCreateProducer = {
      document: "67342387096",
      name: "Produtor Teste",
      farmName: "Fazenda Teste",
      city: "Barueri",
      state: "São Paulo",
      farmTotalArea: 200,
      farmArableTotal: 100,
      farmVegetationArea: 100,
      farmCrops: ["café", "cana"]
    }
  });

  it('Must create a Producer', async () => {

    const createProducerResult = await producerService.createProducer(reqCreateProducer);
    expect(createProducerResult).toHaveProperty('id');
  });

  it('Must thrown an exception if Producer registered with same document', async () => {
    expect(producerService.createProducer(reqCreateProducer)).rejects.toBeInstanceOf(AppErrorHandler);
  });

  afterAll(async () => {
    await prisma.producer.deleteMany();
  });

});

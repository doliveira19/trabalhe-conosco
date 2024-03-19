import { ProducerEntity } from "~/entities/producer/producer.entity";
import { CreateProducerDTO } from "~/dtos/producer/create.producer.dto";
import { UpdateProducerDTO } from "~/dtos/producer/update.producer.dto";
import AppErrorHandler from "~/errorHandler/appErrorHandler";
import prisma from "~/orm/prisma";
import { ProducerValidation } from "~/validations";

export class ProducerRepository {

  private producerValidation = new ProducerValidation();

  getAllProducers = async (): Promise<ProducerEntity[] | []> => {

    const producers = await prisma.producer.findMany();

    return producers;

  };

  getProducer = async (idProducer: number): Promise<ProducerEntity> => {

    const { id } = this.producerValidation.readProducerValidation.parse({ id: idProducer });

    const producer = await prisma.producer.findUnique({
      where: {
        id,
      },
    });

    if (!producer) {
      throw new AppErrorHandler('Produtor não encontrado', 404);
    }

    return producer;

  };

  createProducer = async (data: CreateProducerDTO): Promise<ProducerEntity> => {

    const {
      document,
      name,
      farmName,
      city,
      state,
      farmArableTotal,
      farmVegetationArea,
      farmTotalArea,
      farmCrops,
    } = this.producerValidation.createProducerValidation.parse(data);

    if (!this.producerValidation.validateDocument(document)) {
      throw new AppErrorHandler('Documento (CPF ou CNPJ) inválido', 400);
    }

    if (!this.producerValidation.validateTotalArea(farmTotalArea, farmArableTotal, farmVegetationArea)) {
      throw new AppErrorHandler('A soma de Área Agricultável e Área de Vegetação ultrapassa a Área Total informada', 400);
    }

    const producer = await prisma.producer.findFirst({
      where: {
        document,
      },
    });

    if (producer) {
      throw new AppErrorHandler('Já existe um produtor cadastrado com esse documento', 400);
    }

    const createdProducer = await prisma.producer.create({
      data: {
        document,
        name,
        farmName,
        city,
        state,
        farmArableTotal,
        farmVegetationArea,
        farmTotalArea,
        farmCrops,
      },
    });

    return createdProducer;

  };

  updateProducer = async (data: UpdateProducerDTO): Promise<ProducerEntity | null> => {

    const { idProducer: id, name, farmName, city, state, farmVegetationArea, farmArableTotal, farmTotalArea, farmCrops } = this.producerValidation.updateProducerValidation.parse(data);

    const producer = await prisma.producer.findUnique({
      where: {
        id,
      },
    });

    if (!producer) {
      throw new AppErrorHandler('Produtor não encontrado', 404);
    }

    const foundFarmTotalArea = (!farmTotalArea) ? Number(producer.farmTotalArea) : farmTotalArea;
    const foundFarmArableTotal = (!farmArableTotal) ? Number(producer.farmArableTotal) : farmArableTotal;
    const foundFarmVegetationArea = (!farmVegetationArea) ? Number(producer.farmVegetationArea) : farmVegetationArea;

    if (!this.producerValidation.validateTotalArea(foundFarmTotalArea, foundFarmArableTotal, foundFarmVegetationArea)) {
      throw new AppErrorHandler('A soma de Área Agricultável e Área de Vegetação ultrapassa a Área Total informada', 400);
    }

    const updatedProducer = await prisma.producer.update({
      where: {
        id,
      },
      data: {
        name,
        farmName,
        city,
        state,
        farmArableTotal,
        farmVegetationArea,
        farmTotalArea,
        farmCrops,
      }
    });

    return updatedProducer;

  };

  deleteProducer = async (idProducer: number): Promise<string> => {

    const { id } = this.producerValidation.readProducerValidation.parse({ id: idProducer });

    const producer = await prisma.producer.findUnique({
      where: {
        id,
      },
    });

    if (!producer) {
      throw new AppErrorHandler('Produtor não encontrado', 404);
    }

    await prisma.producer.delete({
      where: {
        id,
      },
    });

    return `Produtor com id [${idProducer}] deletado`;

  };
}
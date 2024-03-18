import { Request, Response } from 'express';
import { ProducerService } from '~/services/producer/producer.service';
import { ProducerRepository } from '~/repositories/producer/producer.repository';

export class ProducerController {

  producerService: ProducerService

  constructor(producerRepository: ProducerRepository) {
    this.producerService = new ProducerService(producerRepository);
  }

  getAllProducers = async (req: Request, res: Response) => {

    const allProducersResp = await this.producerService.getAllProducers();
    res.status(200).send(allProducersResp || {});
  };

  getProducer = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const getProducerResp = await this.producerService.getProducer(id);
    res.status(200).send(getProducerResp);
  };

  createProducer = async (req: Request, res: Response) => {
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
    } = req.body;

    const createdProducerResp = await this.producerService.createProducer({
      document,
      name,
      farmName,
      city,
      state,
      farmArableTotal,
      farmVegetationArea,
      farmTotalArea,
      farmCrops,
    });
    res.status(200).send(createdProducerResp);
  };

  updateProducer = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const {
      name,
      farmName,
      city,
      state,
      farmArableTotal,
      farmVegetationArea,
      farmTotalArea,
      farmCrops,
    } = req.body;

    const updatedProducerResp = await this.producerService.updateProducer({
      idProducer: id,
      name,
      farmName,
      city,
      state,
      farmArableTotal,
      farmVegetationArea,
      farmTotalArea,
      farmCrops
    });
    res.status(200).send(updatedProducerResp);
  };

  deleteProducer = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deletedProducerResp = await this.producerService.deleteProducer(id);
    res.status(200).send({ message: deletedProducerResp });
  };

};

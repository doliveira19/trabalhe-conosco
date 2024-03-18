import { Router } from 'express';
import { ProducerController } from '../../controllers/producer/producer.controller';
import { ProducerRepository } from '~/repositories/producer/producer.repository';

const router = Router();
const producerRepository = new ProducerRepository();
const producerController = new ProducerController(producerRepository);

router.get('/', producerController.getAllProducers);
router.get('/:id', producerController.getProducer);
router.put('/:id', producerController.updateProducer);
router.post('/', producerController.createProducer);
router.delete('/:id', producerController.deleteProducer);

export default router;

import { Router } from 'express';
import { ProdutorController } from '../../controllers/produtor/produtor.controller';

const router = Router();
const produtorController = new ProdutorController();

router.get('/', produtorController.getAllProdutores);
router.get('/:id', produtorController.getProdutor);
router.put('/:id', produtorController.updateProdutor);
router.post('/', produtorController.createProdutor);
router.delete('/:id', produtorController.deleteProdutor);

export default router;

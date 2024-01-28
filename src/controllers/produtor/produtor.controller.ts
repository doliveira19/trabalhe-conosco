import { Request, Response } from 'express';
import { produtorService } from '~/services/produtor/produtor.service';

export class ProdutorController {

  getAllProdutores = async (req: Request, res: Response) => {

    const allProdutoresResp = await produtorService.getAllProdutores();
    res.status(200).send(allProdutoresResp || {});
  };

  getProdutor = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const getProdutorResp = await produtorService.getProdutor(id);
    res.status(200).send(getProdutorResp);
  };

  createProdutor = async (req: Request, res: Response) => {
    const { documento, nome, nomeFazenda, cidade, estado, areaAgricultavelFazenda, areaVegetacaoFazenda, areaTotalFazenda, culturasFazenda } = req.body;

    const createdProdutorResp = await produtorService.createProdutor({
      documento,
      nome,
      nomeFazenda,
      cidade,
      estado,
      areaAgricultavelFazenda,
      areaVegetacaoFazenda,
      areaTotalFazenda,
      culturasFazenda
    });
    res.status(200).send(createdProdutorResp);
  };

  updateProdutor = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, nomeFazenda, cidade, estado, areaAgricultavelFazenda, areaVegetacaoFazenda, areaTotalFazenda, culturasFazenda } = req.body;

    const updatedProdutorResp = await produtorService.updateProdutor({
      idProdutor: id,
      nome,
      nomeFazenda,
      cidade,
      estado,
      areaAgricultavelFazenda,
      areaVegetacaoFazenda,
      areaTotalFazenda,
      culturasFazenda
    });
    res.status(200).send(updatedProdutorResp);
  };

  deleteProdutor = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deletedProdutorResp = await produtorService.deleteProdutor(id);
    res.status(200).send({ message: deletedProdutorResp });
  };

};

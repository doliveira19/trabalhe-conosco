import { ICreateProdutor, IUpdateProdutor } from "~/entities/produtor/produtor.entity";
import AppErrorHandler from "~/errorHandler/appErrorHandler";
import prisma from "~/services/prisma";
import { ProdutorValidation } from "~/validations";

export class ProdutorRepository {

  private produtorValidation = new ProdutorValidation();

  getAllProdutores = async () => {

    const produtores = await prisma.produtor.findMany();

    return produtores;

  };

  getProdutor = async (idProdutor: number) => {

    const { id } = this.produtorValidation.readProdutoresValidation.parse({ id: idProdutor });

    const produtor = await prisma.produtor.findUnique({
      where: {
        id,
      },
    });

    if (!produtor) {
      throw new AppErrorHandler('Produtor não encontrado', 404);
    }

    return produtor;

  };

  createProdutor = async (data: ICreateProdutor) => {

    const { documento, nome, nomeFazenda, cidade, estado, areaAgricultavelFazenda, areaVegetacaoFazenda, areaTotalFazenda, culturasFazenda } = this.produtorValidation.createProdutorValidation.parse(data);

    if (!this.produtorValidation.validarDocumento(documento)) {
      throw new AppErrorHandler('Documento (CPF ou CNPJ) inválido', 400);
    }

    if (!this.produtorValidation.validarAreaTotal(areaTotalFazenda, areaAgricultavelFazenda, areaVegetacaoFazenda)) {
      throw new AppErrorHandler('A soma de Área Agricultável e Área de Vegetação ultrapassa a Área Total informada', 400);
    }

    const produtor = await prisma.produtor.findFirst({
      where: {
        documento,
      },
    });

    if (produtor) {
      throw new AppErrorHandler('Já existe um produtor cadastrado com esse documento', 400);
    }

    const createdProdutor = await prisma.produtor.create({
      data: {
        documento,
        nome,
        nomeFazenda,
        cidade,
        estado,
        areaAgricultavelFazenda,
        areaVegetacaoFazenda,
        areaTotalFazenda,
        culturasFazenda,
      },
    });

    return createdProdutor;

  };

  updateProdutor = async (data: IUpdateProdutor) => {

    const { idProdutor: id, nome, nomeFazenda, cidade, estado, areaVegetacaoFazenda, areaAgricultavelFazenda, areaTotalFazenda, culturasFazenda } = this.produtorValidation.updateProdutorValidation.parse(data);

    const produtor = await prisma.produtor.findUnique({
      where: {
        id,
      },
    });

    if (!produtor) {
      throw new AppErrorHandler('Produtor não encontrado', 404);
    }

    const foundAreaTotalFazenda = (!areaTotalFazenda) ? Number(produtor.areaTotalFazenda) : areaTotalFazenda;
    const foundAreaAgricultavelFazenda = (!areaAgricultavelFazenda) ? Number(produtor.areaAgricultavelFazenda) : areaAgricultavelFazenda;
    const foundAreaVegetacaoFazenda = (!areaVegetacaoFazenda) ? Number(produtor.areaVegetacaoFazenda) : areaVegetacaoFazenda;

    if (!this.produtorValidation.validarAreaTotal(foundAreaTotalFazenda, foundAreaAgricultavelFazenda, foundAreaVegetacaoFazenda)) {
      throw new AppErrorHandler('A soma de Área Agricultável e Área de Vegetação ultrapassa a Área Total informada', 400);
    }

    const updProdutor = await prisma.produtor.update({
      where: {
        id,
      },
      data: {
        nome,
        nomeFazenda,
        cidade,
        estado,
        areaAgricultavelFazenda,
        areaVegetacaoFazenda,
        areaTotalFazenda,
        culturasFazenda,
      }
    });

    return updProdutor;

  };

  deleteProdutor = async (idProdutor: number) => {

    const { id } = this.produtorValidation.readProdutoresValidation.parse({ id: idProdutor });

    const produtor = await prisma.produtor.findUnique({
      where: {
        id,
      },
    });

    if (!produtor) {
      throw new AppErrorHandler('Produtor não encontrado', 404);
    }

    await prisma.produtor.delete({
      where: {
        id,
      },
    });

    return `Produtor com id [${idProdutor}] deletado`;

  };
}
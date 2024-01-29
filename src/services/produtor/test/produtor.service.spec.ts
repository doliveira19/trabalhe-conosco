import AppErrorHandler from '~/errorHandler/appErrorHandler';
import { produtorService } from '../produtor.service';
import prisma from '~/services/prisma';

describe('Should test ProdutorService', () => {

  let reqCreateProdutor;

  beforeAll(async () => {
    await prisma.produtor.deleteMany();
    reqCreateProdutor = {
      documento: "67342387096",
      nome: "Produtor Teste",
      nomeFazenda: "Fazenda Teste",
      cidade: "Barueri",
      estado: "São Paulo",
      areaTotalFazenda: 200,
      areaAgricultavelFazenda: 100,
      areaVegetacaoFazenda: 100,
      culturasFazenda: ["café", "cana"]
    }
  });

  it('Must create a Produtor', async () => {

    const createProdutorResult = await produtorService.createProdutor(reqCreateProdutor);
    expect(createProdutorResult).toHaveProperty('id');
  });

  it('Must thrown an exception if Produtor registered with same document', async () => {
    expect(produtorService.createProdutor(reqCreateProdutor)).rejects.toBeInstanceOf(AppErrorHandler);
  });

  afterAll(async () => {
    await prisma.produtor.deleteMany();
  });

});

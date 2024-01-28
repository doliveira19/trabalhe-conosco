import * as z from 'zod';

export class ProdutorValidation {
  createProdutorValidation = z.object({
    documento: z.string(),
    nome: z.string(),
    nomeFazenda: z.string(),
    cidade: z.string(),
    estado: z.string(),
    areaTotalFazenda: z.number().nonnegative().min(0.1),
    areaAgricultavelFazenda: z.number().nonnegative().min(0.1),
    areaVegetacaoFazenda: z.number().nonnegative().min(0.1),
    culturasFazenda: z.string().array(),
  }).strict();

  updateProdutorValidation = z.object({
    idProdutor: z.number().nonnegative(),
    nome: z.string().optional(),
    nomeFazenda: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    areaTotalFazenda: z.number().nonnegative().min(0.1).optional(),
    areaAgricultavelFazenda: z.number().nonnegative().min(0.1).optional(),
    areaVegetacaoFazenda: z.number().nonnegative().min(0.1).optional(),
    culturasFazenda: z.string().array().optional(),
  }).strict();

  readProdutoresValidation = z.object({
    id: z.number().nonnegative(),
  }).strict();

  validarAreaTotal = (areaTotalFazenda: number, areaAgricultavelFazenda: number, areaVegetacaoFazenda: number): boolean => {
    return (areaTotalFazenda >= (areaAgricultavelFazenda + areaVegetacaoFazenda));
  }

  validarCPF = (cpf: string): boolean => {
    // Remover caracteres não numéricos
    const cpfNumeros = cpf.replace(/\D/g, '');

    if (cpfNumeros.length !== 11) {
      return false;
    }

    // Calcular dígitos verificadores
    const cpfArray = cpfNumeros.split('').map(Number);
    const somaPrimeiroDigito = cpfArray.slice(0, 9).reduce((acc, digit, index) => acc + digit * (10 - index), 0);
    const restoPrimeiroDigito = somaPrimeiroDigito % 11;
    const primeiroDigito = (restoPrimeiroDigito < 2) ? 0 : 11 - restoPrimeiroDigito;

    const somaSegundoDigito = cpfArray.slice(0, 10).reduce((acc, digit, index) => acc + digit * (11 - index), 0);
    const restoSegundoDigito = somaSegundoDigito % 11;
    const segundoDigito = (restoSegundoDigito < 2) ? 0 : 11 - restoSegundoDigito;

    // Verificar se os dígitos verificadores estão corretos
    if (cpfArray[9] !== primeiroDigito || cpfArray[10] !== segundoDigito) {
      return false;
    }
    return true;
  }

  validarCNPJ = (cnpj: string): boolean => {

    const calcularDigitoVerificadorCNPJ = (array: number[]): number => {
      const multiplicadores = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const soma = array.reduce((acc, digit, index) => acc + digit * multiplicadores[index], 0);
      const resto = soma % 11;
      return (resto < 2) ? 0 : 11 - resto;
    }

    // Remover caracteres não numéricos
    const cnpjNumeros = cnpj.replace(/\D/g, '');

    // Verificar se há 14 dígitos
    if (cnpjNumeros.length !== 14) {
      return false;
    }

    // Calcular dígitos verificadores
    const cnpjArray = cnpjNumeros.split('').map(Number);
    const primeiroDigito = calcularDigitoVerificadorCNPJ(cnpjArray.slice(0, 12));
    const segundoDigito = calcularDigitoVerificadorCNPJ([...cnpjArray.slice(0, 12), primeiroDigito]);

    // Verificar se os dígitos verificadores estão corretos
    if (cnpjArray[12] !== primeiroDigito || cnpjArray[13] !== segundoDigito) {
      return false;
    }

    return true;
  }

  validarDocumento = (documento: string): boolean => {
    if (documento.length == 11) return this.validarCPF(documento);
    if (documento.length == 14) return this.validarCNPJ(documento);
    return false;
  }

}

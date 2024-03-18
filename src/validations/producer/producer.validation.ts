import * as z from 'zod';

export class ProducerValidation {
  createProducerValidation = z.object({
    document: z.string(),
    name: z.string(),
    farmName: z.string(),
    city: z.string(),
    state: z.string(),
    farmTotalArea: z.number().nonnegative().min(0.1),
    farmArableTotal: z.number().nonnegative().min(0.1),
    farmVegetationArea: z.number().nonnegative().min(0.1),
    farmCrops: z.string().array(),
  }).strict();

  updateProducerValidation = z.object({
    idProducer: z.number().nonnegative(),
    name: z.string().optional(),
    farmName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    farmTotalArea: z.number().nonnegative().min(0.1).optional(),
    farmArableTotal: z.number().nonnegative().min(0.1).optional(),
    farmVegetationArea: z.number().nonnegative().min(0.1).optional(),
    farmCrops: z.string().array().optional(),
  }).strict();

  readProducerValidation = z.object({
    id: z.number().nonnegative(),
  }).strict();

  validateTotalArea = (areaTotalFazenda: number, areaAgricultavelFazenda: number, areaVegetacaoFazenda: number): boolean => {
    return (areaTotalFazenda >= (areaAgricultavelFazenda + areaVegetacaoFazenda));
  }

  validateCPF = (cpf: string): boolean => {
    // Remover caracteres não numéricos
    const cpfNumbers = cpf.replace(/\D/g, '');

    if (cpfNumbers.length !== 11) {
      return false;
    }

    // Calcular dígitos verificadores
    const cpfArray = cpfNumbers.split('').map(Number);
    const sumFirstDigit = cpfArray.slice(0, 9).reduce((acc, digit, index) => acc + digit * (10 - index), 0);
    const restFirstDigit = sumFirstDigit % 11;
    const firstDigit = (restFirstDigit < 2) ? 0 : 11 - restFirstDigit;

    const somaSegundoDigito = cpfArray.slice(0, 10).reduce((acc, digit, index) => acc + digit * (11 - index), 0);
    const restoSegundoDigito = somaSegundoDigito % 11;
    const segundoDigito = (restoSegundoDigito < 2) ? 0 : 11 - restoSegundoDigito;

    // Verificar se os dígitos verificadores estão corretos
    if (cpfArray[9] !== firstDigit || cpfArray[10] !== segundoDigito) {
      return false;
    }
    return true;
  }

  validateCNPJ = (cnpj: string): boolean => {

    const checkDigitCNPJ = (array: number[]): number => {
      const multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const sum = array.reduce((acc, digit, index) => acc + digit * multipliers[index], 0);
      const rest = sum % 11;
      return (rest < 2) ? 0 : 11 - rest;
    }

    // remove not numeris
    const cnpjNumbers = cnpj.replace(/\D/g, '');

    // Verify if the size is differente than 14
    if (cnpjNumbers.length !== 14) {
      return false;
    }

    // Calculate Check Digit
    const cnpjArray = cnpjNumbers.split('').map(Number);
    const firstDigit = checkDigitCNPJ(cnpjArray.slice(0, 12));
    const secondDigit = checkDigitCNPJ([...cnpjArray.slice(0, 12), firstDigit]);

    // Verificar se os dígitos verificadores estão corretos
    if (cnpjArray[12] !== firstDigit || cnpjArray[13] !== secondDigit) {
      return false;
    }

    return true;
  }

  validateDocument = (document: string): boolean => {
    if (document.length == 11) return this.validateCPF(document);
    if (document.length == 14) return this.validateCNPJ(document);
    return false;
  }

}

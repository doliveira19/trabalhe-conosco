# API de Cadastro de Produtores Rurais (Producers)

O mesmo consiste em um cadastro de produtor rural com os seguintes dados:

1.  CPF ou CNPJ
2.  Nome do produtor
3.  Nome da Fazenda
4.  Cidade
5.  Estado
6.  Área total em hectares da fazenda
7.  Área agricultável em hectares
8.  Área de vegetação em hectares
9.  Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)

# Requisitos de negócio

- O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.
- O sistema deverá validar CPF e CNPJ digitados incorretamente.
- A soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- Cada produtor pode plantar mais de uma cultura em sua Fazenda.
- A plataforma deverá ter um Dashboard que exiba:
  - Total de fazendas em quantidade
  - Total de fazendas em hectares (área total)
  - Gráfico de pizza por estado.
  - Gráfico de pizza por uso de solo (Área agricultável e vegetação)

# Requisitos técnicos

  - Salvar os dados em um banco de dados Postgres usando o NodeJS como layer de Backend, e entregar os endpoints para cadastrar, editar, e excluir produtores rurais, além do endpoint que retorne os totais para o dashboard.

# Desenvolvimento da aplicação

O desenvolvimento da aplicação foi pensado usando algumas camadas da Arquitetura Limpa, mais precisamente as camadas de Entidade e Caso de Uso (aqui tratei com Serviços ou Services) e tendo um controlador para direcionar as requisições da API, bem como Repositórios para fazer as operações de Banco de Dados (nesse caso, foi usado o ORM Prisma para abstrair as queries e operação de insert/update/delete). Também foi criado um Teste Unitário para o principal Caso de Uso, que é a criação de um Produtor Rutal (Producer).

Pontos de melhorias:
 - Criação de tabela para cadastro de Culturas de Solo para que só seja possível cadastrar um Produtor Rural se Cultura de Solo existir no cadastro, bem como os endpoints para o CRUD dessa tabela;
 - Inclusão de testes para os demais Casos de Uso;

# Execução do projeto

## Tecnologias utilizadas

  - Docker
  - NodeJS
  - Typescript
  - Postgresql
  - Prisma
  - Swagger
  - Zod

Para facilitar a execução da aplicação, o banco de dados postgresql necessário foi incluído em um container docker. Logo, é necessário ter o Docker instalado no sistema.

# Passos para a execução do projeto

- Clonar esse repositório;
- Entrar no diretório do repositório clonado;
- Executar o comando `$ docker compose up -d`;
- Instalar as dependências do projeto e do Prisma com o comando `$ npm install`;
- Iniciar a aplicação: `$ npm run dev`;

## npm scripts

Scripts que podem ser executados com o comando `$ npm run "script-name"`:
* `dev`: Inicia a aplicação;
* `test`: Executa testes unitários;
* `build`: Realiza build do projeto no diretório `./build`;
* `start`: Executa o projeto após build;

## Documentação da api

http://localhost:3000/docs

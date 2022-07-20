# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [uuid](https://www.npmjs.com/package/uuid)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptjs](https://www.npmjs.com/package/bcrypt)

## 2. Diagrama ER

[ Voltar para o topo ](#tabela-de-conteúdos)

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

<p align="center">
    <img width="500" src="src/assets/to_readme/diagrama.png">
</p>

## 3. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

## 4. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

## 5. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Client Or Personal]()
  - [POST - /register](#1.1-criação-de-usuário)
  - [GET - /users]()
  - [GET - /clients/:id]()

## 1. **Client Or Personal**

[ Voltar para os Endpoints ](#5-endpoints)

A criação do usuário é definida pelos campos abaixo, a diferença de um cliente para um personal é o campo adm.

| Campo        | Tipo    | Descrição                                        |
| ------------ | ------- | ------------------------------------------------ |
| id           | string  | Identificador único do usuário.                  |
| name         | string  | O nome do usuário.                               |
| email        | string  | O e-mail do usuário.                             |
| age          | string  | A idade do usuário.                              |
| password     | string  | A senha de acesso do usuário.                    |
| phone_number | string  | O número de contato do usuário.                  |
| status       | boolean | A condição para o usuário ativo ou inativo.      |
| adm          | boolean | Define se um usuário é um Client ou um Personal. |
| plan         | string  | O tipo de plano de academia.                     |
| checkin      | string  | Horário de entrada na academia                   |
| checkout     | string  | Horário de saída da academia                     |
| lock_number  | string  | É o número de armário da academia                |

## Endpoints

| Método | Rota         | Descrição                                     |
| ------ | ------------ | --------------------------------------------- |
| POST   | /register    | Criação de um cliente ou personal.            |
| GET    | /users       | Lista todos os usuários.                      |
| GET    | /clients/:id | Lista um cliente usando seu ID como parâmetro |

### 1.1. **Criação de Client or Personal**

### `/register`

### Exemplo de Request:

```
POST /register
Host: http://.com/v1
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Alex",
  "email": "alex@mail.com",
  "age": "23",
  "password": "1234",
  "phone_number": "84-99232-0099",
  "status": true,
  "adm": true,
  "plan": "Family",
  "checkin": "07:00",
  "checkout": "17:00",
  "lock_number": 13
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
  "name": "Alex",
  "email": "alex@mail.com",
  "age": "23",
  "password": "1234",
  "phone_number": "84-99232-0099",
  "status": true,
  "adm": true,
  "plan": "Family",
  "checkin": "07:00",
  "checkout": "17:00",
  "lock_number": 13
}
```

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

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Client Or Personal]()
  - [POST - /register](#1.1-criação-de-usuário)
  - [POST - /login]()
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
| POST   | /login       | Gera o token de autenticação.                 |
| GET    | /users       | Lista todos os usuários.                      |
| GET    | /clients/:id | Lista um cliente usando seu ID como parâmetro |

### 1.1. **Criação de Client or Personal**

### `/register`

### Exemplo de Request:

```
POST /register
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "Alex",
  "email": "alex@gmail.com",
  "age": "28",
  "password": "1234",
  "phone_number": "9819839189",
  "adm": true,
  "plan": "Family",
  "checkin": "3 horas",
  "checkout": "2 horas",
  "lock_number": 2,
  "street": "Rua 007",
  "cep": "59695-000",
  "number": "25",
  "town": "Floripa",
  "state": "SC"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "78592cd4-86f9-4a0d-80f6-616a0b8ef6f1",
  "name": "Alex",
  "email": "alex@gmail.com",
  "age": "28",
  "status": true,
  "street": "Rua 007",
  "number": "25",
  "town": "Floripa",
  "state": "SC"
}
```

### Possíveis Erros:

| Código do Erro | Descrição                 |
| -------------- | ------------------------- |
| 409 Conflict   | Email already registered. |

### 1.2. Autenticação

[ Voltar para o topo ](#tabela-de-conteúdos)

### `/login`

### Exemplo de Request:

```
POST /login
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "email": "alex@gmail.com",
  "password": "1234"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1NDM4MiwiZXhwIjoxNjU4MzU3OTgyfQ.ERXtzLfQ9KtDsMaqWrQczgonuYxGo9XT5a6bI0u2ZkU"
}
```

### Possíveis Erros:

| Código do Erro | Descrição             |
| -------------- | --------------------- |
| 403 Forbidden  | Wrong email/password. |
| 404 Not Found  | Account not found.    |

### 1.3. **Listando Usuários**

### `/users`

### Exemplo de Request:

```
GET /users
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

Para listar todos os usuários, você deve estar logado e com permissão de administrador.

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "36489681-bd4b-47c5-ad11-eaaef2e80b6d",
    "name": "Alex",
    "email": "alex@gmail.com",
    "age": "28",
    "password": "$2a$10$9PPZtwZf4kNoWaHVKuf0N.2QgU2HFfvtDDulrHsCGeuBUuK6T8KOi",
    "phone_number": "9819839189",
    "status": true,
    "adm": true,
    "plan": "Family",
    "checkin": "3 horas",
    "checkout": "2 horas",
    "lock_number": 2,
    "created_at": "2022-07-20T20:25:01.059Z",
    "updated_at": "2022-07-20T20:25:01.059Z",
    "avaliations": [],
    "journals": [],
    "addresses": [
      {
        "id": "92905f3b-5d5d-4400-a615-fbe0677f3cc6",
        "street": "Rua 007",
        "number": "25",
        "cep": "59695-000",
        "complement": null,
        "town": "Floripa",
        "state": "SC"
      }
    ]
  }
]
```

### Possíveis Erros:

| Código do Erro  | Descrição                         |
| --------------- | --------------------------------- |
| 401 Unathorized | Invalid token.                    |
| 403 Forbidden   | Needs admin permission to access. |

### 1.4. **Listando Usuários Especifico**

### `/users/:id`

### Exemplo de Request:

```
GET /users/36489681-bd4b-47c5-ad11-eaaef2e80b6d
Host: http://localhost:3000
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZlNTlkMmQ2LTg5MmUtNGE5OC1iNjJjLWJiM2RkZWVmYWM4MiIsImFkbSI6ZmFsc2UsImlhdCI6MTY1ODM1MTk2MiwiZXhwIjoxNjU4MzU1NTYyfQ._S5WW_T4kDMnVTLjESv2GqQgjO21pNBW9O2dxejWXFM
Content-type: application/json
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "36489681-bd4b-47c5-ad11-eaaef2e80b6d",
    "name": "Alex",
    "email": "alex@gmail.com",
    "age": "28",
    "password": "$2a$10$9PPZtwZf4kNoWaHVKuf0N.2QgU2HFfvtDDulrHsCGeuBUuK6T8KOi",
    "phone_number": "9819839189",
    "status": true,
    "adm": true,
    "plan": "Family",
    "checkin": "3 horas",
    "checkout": "2 horas",
    "lock_number": 2,
    "created_at": "2022-07-20T20:25:01.059Z",
    "updated_at": "2022-07-20T20:25:01.059Z",
    "addresses": [
      {
        "id": "92905f3b-5d5d-4400-a615-fbe0677f3cc6",
        "street": "Rua 007",
        "number": "25",
        "cep": "59695-000",
        "complement": null,
        "town": "Floripa",
        "state": "SC"
      }
    ]
  }
]
```

### Possíveis Erros:

| Código do Erro  | Descrição                         |
| --------------- | --------------------------------- |
| 401 Unathorized | Invalid token.                    |
| 403 Forbidden   | Needs admin permission to access. |

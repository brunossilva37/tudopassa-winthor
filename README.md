# TudoPassa Winthor

API Node.js para disponibilizar dados do Winthor/Oracle no contrato esperado pelo TudoPassa.

A aplicação funciona como uma camada de integração entre o **Winthor/Oracle** e o **TudoPassaBack**, permitindo que o TudoPassa consuma os dados através de uma API HTTP/JSON padronizada.

## Arquitetura

```text
TudoPassaBack
     |
     | HTTP / JSON + JWT
     v
TudoPassa Winthor API
     |
     | oracledb
     v
Oracle / Winthor
```

A API possui uma camada de abstração que permite trabalhar inicialmente com dados de **mock**, sem necessidade de conexão com o Oracle.

Quando as consultas do Winthor estiverem ajustadas, basta alterar:

```env
DATA_SOURCE=oracle
```

O contrato HTTP permanece o mesmo.

---

## Tecnologias

- Node.js
- Express
- OracleDB (`oracledb`)
- JWT
- Argon2
- Swagger / OpenAPI
- dotenv

---

# Autenticação

As rotas de dados são protegidas por **Bearer JWT**.

## Login

```http
POST /api/auth/login
```

Exemplo:

```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "usuario": "tudopassa",
    "senha": "SUA_SENHA"
  }'
```

Resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "tipo": "Bearer",
  "expiresIn": "8h"
}
```

O token retornado deve ser enviado nas requisições protegidas:

```http
Authorization: Bearer SEU_TOKEN
```

## Rotas públicas

As seguintes rotas não exigem autenticação:

```text
GET  /health
GET  /docs/
GET  /swagger.json
POST /api/auth/login
```

## Rotas protegidas

As seguintes rotas exigem JWT:

```text
GET /api/produtos
GET /api/clientes
GET /api/fornecedores
```

---

# Swagger / OpenAPI

A API possui documentação interativa através do Swagger UI.

Com a aplicação em execução, acesse:

```text
http://localhost:3000/docs/
```

Especificação OpenAPI:

```text
http://localhost:3000/swagger.json
```

No Swagger é possível:

1. Fazer login através de `POST /api/auth/login`.
2. Copiar o JWT retornado.
3. Clicar em **Authorize**.
4. Informar o token.
5. Executar as rotas protegidas diretamente pela interface.

O Swagger utiliza autenticação:

```text
Bearer JWT
```

---

# Endpoints

## Health

Verifica se a API está funcionando.

```http
GET /health
```

Exemplo:

```bash
curl "http://localhost:3000/health"
```

Resposta:

```json
{
  "status": "ok",
  "servico": "tudopassa-winthor",
  "data_source": "mock",
  "timestamp": "2026-09-16T00:57:09.671Z"
}
```

---

# Produtos

## Listar produtos

```http
GET /api/produtos
```

Exemplo:

```bash
curl "http://localhost:3000/api/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer SEU_TOKEN"
```

Resposta:

```json
[
  {
    "referencia": "1715036",
    "categoria": "CAMISA",
    "descricao": "Tudo passa iluminado MCMXCIX",
    "unidade": "UN",
    "imagem": "1715036.jpeg",
    "variantes": [
      {
        "cor_codigo_nome": "Cinza",
        "valor_unitario": 40,
        "valor_unitario_tb1": 40,
        "valor_unitario_tb2": 38,
        "valor_unitario_tb3": 35,
        "grade": {
          "PP": 2,
          "P": 5,
          "M": 8,
          "G": 6,
          "GG": 3,
          "U": 0
        },
        "quantidade_total": 24,
        "valor_total": 960,
        "valor_total_tb1": 960,
        "valor_total_tb2": 912,
        "valor_total_tb3": 840
      }
    ]
  }
]
```

---

# Clientes

## Listar clientes

```http
GET /api/clientes
```

Exemplo:

```bash
curl "http://localhost:3000/api/clientes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer SEU_TOKEN"
```

Formato esperado:

```json
[
  {
    "codigo": "101",
    "nome": "João Silva",
    "cpf_cnpj": "123.456.789-00",
    "celular": "(11) 98888-7777",
    "email": "joao@email.com",
    "endereco": "Rua das Flores",
    "numero": "50",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "uf": "SP",
    "cep": "01001-000",
    "data_cadastro": "2023-10-27T14:30:00.000Z",
    "formas_pagamento": [
      "Crediário Loja",
      "Cartão Crédito"
    ],
    "cartoes_loja": [
      "Visa Tudo Passa",
      "Black VIP"
    ],
    "bloqueado": false,
    "credito_limite": 4555,
    "credito_atual": 55,
    "foto": "1783102889090-motoqueiro_smart_2.png",
    "ref_usuarios": [
      "patricio"
    ]
  }
]
```

---

# Fornecedores

## Listar fornecedores

```http
GET /api/fornecedores
```

Exemplo:

```bash
curl "http://localhost:3000/api/fornecedores" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer SEU_TOKEN"
```

Formato esperado:

```json
[
  {
    "codigo": "101",
    "nome": "Mario da Silva Sauro",
    "cpf_cnpj": "123.456.789-00",
    "celular": "(11) 98888-7777",
    "email": "joao@email.com",
    "endereco": "R. Miguel Ferreira da Silva, 218",
    "numero": "50",
    "bairro": "Curiacaca",
    "cidade": "Caucaia",
    "uf": "CE",
    "cep": "61.601-172",
    "tipo": "Transportadora",
    "logomarca": "1783102385351-motoqueiro_smart.png",
    "ref_clientes": [
      "201",
      "205",
      102
    ],
    "ref_produtos": [
      "P-001",
      "P-002",
      "1715036",
      "1716026",
      "1116064"
    ],
    "ref_usuarios": [
      "patricio"
    ],
    "data_cadastro": "2023-10-27T14:30:00.000Z"
  }
]
```

---

# Contrato TudoPassa

O TudoPassaBack utiliza internamente o recurso chamado:

```text
profissionais
```

Na API Winthor, esse recurso é disponibilizado através de:

```text
GET /api/fornecedores
```

Ou seja:

```text
TudoPassaBack
     |
     | profissionais
     v
GET /api/fornecedores
     |
     v
Winthor
```

A API mantém o contrato de dados esperado pelo TudoPassa, independentemente de os dados serem provenientes de mock ou Oracle.

---

# Fonte de dados

A fonte de dados é definida através da variável:

```env
DATA_SOURCE=mock
```

## Mock

Para executar sem conexão com Oracle:

```env
DATA_SOURCE=mock
```

Os dados de teste ficam em:

```text
src/mocks/
├── clientes.js
├── produtos.js
└── fornecedores.js
```

Essa opção permite validar a integração do TudoPassaBack sem depender do banco Winthor.

## Oracle

Quando as consultas estiverem ajustadas para o banco real:

```env
DATA_SOURCE=oracle
```

Configuração:

```env
ORACLE_USER=totvs
ORACLE_PASSWORD=sua_senha
ORACLE_CONNECT_STRING=192.168.0.10:1521/WINTHOR

ORACLE_POOL_MIN=1
ORACLE_POOL_MAX=5
ORACLE_POOL_INCREMENT=1
```

---

# Variáveis de ambiente

Exemplo:

```env
PORT=3000

# mock = dados de teste | oracle = banco real
DATA_SOURCE=mock

# Oracle / Winthor
ORACLE_USER=totvs
ORACLE_PASSWORD=
ORACLE_CONNECT_STRING=192.168.0.10:1521/WINTHOR

ORACLE_POOL_MIN=1
ORACLE_POOL_MAX=5
ORACLE_POOL_INCREMENT=1

# Autenticação
AUTH_USER=tudopassa
AUTH_PASSWORD_HASH=

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=8h
```

O arquivo `.env` **não deve ser versionado**.

Utilize o arquivo:

```text
.env.example
```

como referência.

---

# Instalação

Clone o projeto:

```bash
git clone https://github.com/brunossilva37/tudopassa-winthor.git
```

Entre no diretório:

```bash
cd tudopassa-winthor
```

Instale as dependências:

```bash
npm install
```

Copie o arquivo de configuração:

```bash
cp .env.example .env
```

Ajuste as variáveis de ambiente conforme necessário.

---

# Executar

## Desenvolvimento

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/docs/
```

## Produção

```bash
npm start
```

---

# Estrutura do projeto

```text
src/
├── app.js
│
├── config/
│   ├── dataSource.js
│   └── database.js
│
├── controllers/
│   ├── clientesController.js
│   ├── fornecedoresController.js
│   └── produtosController.js
│
├── docs/
│   └── swagger.js
│
├── middleware/
│   ├── auth.js
│   └── requireAuth.js
│
├── mocks/
│   ├── clientes.js
│   ├── fornecedores.js
│   └── produtos.js
│
├── queries/
│   ├── clientes.js
│   ├── fornecedores.js
│   └── produtos.js
│
├── repositories/
│   ├── clientesRepository.js
│   ├── fornecedoresRepository.js
│   └── produtosRepository.js
│
├── routes/
│   ├── clientes.js
│   ├── fornecedores.js
│   └── produtos.js
│
└── services/
    ├── clientesService.js
    ├── fornecedoresService.js
    └── produtosService.js
```

---

# Queries Oracle

As consultas estão em:

```text
src/queries/clientes.js
src/queries/produtos.js
src/queries/fornecedores.js
```

As queries atuais são intencionalmente genéricas e devem ser ajustadas conforme a estrutura da instalação específica do Winthor.

A arquitetura separa:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Query / Oracle
```

A camada de service é responsável por normalizar os dados retornados pelo Oracle para o contrato esperado pelo TudoPassa.

Dessa forma, alterações nos nomes das tabelas ou colunas do Winthor ficam isoladas principalmente na camada de consulta.

---

# Segurança

- O `.env` não deve ser enviado ao Git.
- A senha do usuário da API é armazenada através de hash Argon2.
- As rotas de dados exigem JWT.
- O segredo do JWT deve permanecer apenas no ambiente da aplicação.
- As credenciais do Oracle não devem ser utilizadas como credenciais da API.

---

# Próximos passos

1. Ajustar as queries para o banco Winthor real.
2. Validar produtos contra o Oracle.
3. Completar variantes, grade, estoque e tabelas de preço dos produtos.
4. Validar clientes contra o Oracle.
5. Completar limite, crédito, bloqueio e formas de pagamento dos clientes.
6. Validar fornecedores contra o Oracle.
7. Validar os três endpoints utilizando `DATA_SOURCE=oracle`.
8. Confirmar o contrato final com o TudoPassaBack.
9. Integrar a API Winthor ao ambiente de produção.

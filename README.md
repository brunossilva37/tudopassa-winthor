# TudoPassa Winthor

API Node.js para disponibilizar dados do Winthor/Oracle no contrato esperado pelo TudoPassa.

## Objetivo

Este projeto funciona como um adaptador:

```text
TudoPassaBack
     |
     | HTTP / JSON
     v
TudoPassa Winthor API
     |
     | oracledb
     v
Oracle / Winthor
```

## Endpoints

### Health

```bash
curl "http://localhost:3000/health"
```

### Produtos

```bash
curl "http://localhost:3000/api/produtos?page=1&limit=100" \
  -H "Accept: application/json"
```

Buscar um produto:

```bash
curl "http://localhost:3000/api/produtos/1715036" \
  -H "Accept: application/json"
```

### Clientes

```bash
curl "http://localhost:3000/api/clientes?page=1&limit=100" \
  -H "Accept: application/json"
```

Buscar um cliente:

```bash
curl "http://localhost:3000/api/clientes/101" \
  -H "Accept: application/json"
```

### Fornecedores

```bash
curl "http://localhost:3000/api/fornecedores?page=1&limit=100" \
  -H "Accept: application/json"
```

Buscar um fornecedor:

```bash
curl "http://localhost:3000/api/fornecedores/101" \
  -H "Accept: application/json"
```

## Contrato TudoPassa

No TudoPassa, o endpoint de fornecedores deve ser utilizado como recurso `profissionais`:

```text
profissionais -> GET /api/fornecedores
```

O objeto retornado por `/api/fornecedores` possui:

```json
{
  "codigo": "101",
  "nome": "Fornecedor Winthor",
  "cpf_cnpj": "12345678900",
  "celular": null,
  "email": null,
  "endereco": "Rua Exemplo",
  "numero": "100",
  "bairro": "Centro",
  "cidade": "Fortaleza",
  "uf": "CE",
  "cep": "60000-000",
  "tipo": "fornecedor",
  "logomarca": null,
  "ref_clientes": [],
  "ref_produtos": [],
  "ref_usuarios": [],
  "data_cadastro": null
}
```

## Instalação

```bash
npm install
```

Copie:

```bash
cp .env.example .env
```

Ajuste as credenciais do Oracle no `.env`.

## Executar

Desenvolvimento:

```bash
npm run dev
```

Produção:

```bash
npm start
```

## Queries

As queries estão em:

```text
src/queries/clientes.js
src/queries/produtos.js
src/queries/fornecedores.js
```

Elas são intencionalmente genéricas e devem ser ajustadas conforme a estrutura da instalação Winthor.

A camada de service normaliza os resultados para o contrato TudoPassa, evitando que o restante da aplicação dependa diretamente dos nomes das colunas Oracle.

## Fonte de dados

Para validar a comunicação sem Oracle, use `DATA_SOURCE=mock`. Os dados ficam em `src/mocks/`. Quando as queries estiverem prontas, use `DATA_SOURCE=oracle`. O contrato HTTP permanece o mesmo.

## Próximos passos

1. Ajustar as queries para o banco Winthor real.
2. Completar variantes, grade, estoque e tabelas de preço de produtos.
3. Completar limite/crédito/bloqueio e formas de pagamento dos clientes.
4. Validar os três endpoints contra o banco.
5. Entregar os exemplos finais de curl e JSON ao projeto TudoPassaBack.

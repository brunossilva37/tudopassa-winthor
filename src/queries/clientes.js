/*
 * Ajuste esta query conforme a estrutura do seu Winthor.
 *
 * IMPORTANTE:
 * Os aliases abaixo representam o contrato interno da aplicação.
 * O repository recebe as colunas já com esses nomes.
 */

export const LISTAR_CLIENTES = `
  SELECT
      CODCLI      AS "codigo",
      CLIENTE     AS "nome",
      CGCENT      AS "cpf_cnpj",
      TELCELENT   AS "celular",
      EMAIL       AS "email",
      ENDERENT    AS "endereco",
      NUMEROENT   AS "numero",
      BAIRROENT   AS "bairro",
      MUNICENT    AS "cidade",
      ESTENT      AS "uf",
      CEPENT      AS "cep",
      DTULTALTER  AS "data_cadastro"
  FROM PCCLIENT
  WHERE 1 = 1
  ORDER BY CODCLI
  OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
`;

export const BUSCAR_CLIENTE = `
  SELECT
      CODCLI      AS "codigo",
      CLIENTE     AS "nome",
      CGCENT      AS "cpf_cnpj",
      TELCELENT   AS "celular",
      EMAIL       AS "email",
      ENDERENT    AS "endereco",
      NUMEROENT   AS "numero",
      BAIRROENT   AS "bairro",
      MUNICENT    AS "cidade",
      ESTENT      AS "uf",
      CEPENT      AS "cep",
      DTULTALTER  AS "data_cadastro"
  FROM PCCLIENT
  WHERE CODCLI = :codigo
`;

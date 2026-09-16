/*
 * Fornecedores são expostos pelo endpoint /fornecedores,
 * mas o formato retornado segue o recurso "profissionais"
 * esperado pelo TudoPassa.
 */

export const LISTAR_FORNECEDORES = `
  SELECT
      CODFORNEC  AS "codigo",
      FORNECEDOR AS "nome",
      CGC        AS "cpf_cnpj",
      TELEFONE   AS "celular",
      EMAIL      AS "email",
      ENDERECO   AS "endereco",
      NUMERO     AS "numero",
      BAIRRO     AS "bairro",
      CIDADE     AS "cidade",
      ESTADO     AS "uf",
      CEP        AS "cep"
  FROM PCFORNEC
  WHERE 1 = 1
  ORDER BY CODFORNEC
  OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
`;

export const BUSCAR_FORNECEDOR = `
  SELECT
      CODFORNEC  AS "codigo",
      FORNECEDOR AS "nome",
      CGC        AS "cpf_cnpj",
      TELEFONE   AS "celular",
      EMAIL      AS "email",
      ENDERECO   AS "endereco",
      NUMERO     AS "numero",
      BAIRRO     AS "bairro",
      CIDADE     AS "cidade",
      ESTADO     AS "uf",
      CEP        AS "cep"
  FROM PCFORNEC
  WHERE CODFORNEC = :codigo
`;

/*
 * Query inicial/genérica.
 *
 * O contrato do TudoPassa possui variantes, grade e tabelas de preço.
 * A consulta abaixo é deliberadamente simples para você expandir
 * conforme as tabelas/campos disponíveis na sua instalação Winthor.
 */

export const LISTAR_PRODUTOS = `
  SELECT
      CODPROD    AS "referencia",
      CODAUXILIAR AS "codigo_barras",
      DESCRICAO  AS "descricao",
      UNIDADE    AS "unidade",
      CODCATEGORIA AS "categoria"
  FROM PCPRODUT
  WHERE 1 = 1
  ORDER BY CODPROD
  OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY
`;

export const BUSCAR_PRODUTO = `
  SELECT
      CODPROD    AS "referencia",
      CODAUXILIAR AS "codigo_barras",
      DESCRICAO  AS "descricao",
      UNIDADE    AS "unidade",
      CODCATEGORIA AS "categoria"
  FROM PCPRODUT
  WHERE CODPROD = :codigo
`;

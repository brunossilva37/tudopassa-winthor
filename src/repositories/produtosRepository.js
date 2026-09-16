import { getConnection } from "../config/database.js";
import { LISTAR_PRODUTOS, BUSCAR_PRODUTO } from "../queries/produtos.js";

export async function listarProdutos({ offset, limit }) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      LISTAR_PRODUTOS,
      { offset, limit },
      { outFormat: 4002 }
    );

    return result.rows ?? [];
  } finally {
    await connection.close();
  }
}

export async function buscarProduto(codigo) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      BUSCAR_PRODUTO,
      { codigo },
      { outFormat: 4002 }
    );

    return result.rows?.[0] ?? null;
  } finally {
    await connection.close();
  }
}

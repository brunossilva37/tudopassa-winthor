import { getConnection } from "../config/database.js";
import {
  LISTAR_FORNECEDORES,
  BUSCAR_FORNECEDOR,
} from "../queries/fornecedores.js";

export async function listarFornecedores({ offset, limit }) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      LISTAR_FORNECEDORES,
      { offset, limit },
      { outFormat: 4002 }
    );

    return result.rows ?? [];
  } finally {
    await connection.close();
  }
}

export async function buscarFornecedor(codigo) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      BUSCAR_FORNECEDOR,
      { codigo },
      { outFormat: 4002 }
    );

    return result.rows?.[0] ?? null;
  } finally {
    await connection.close();
  }
}

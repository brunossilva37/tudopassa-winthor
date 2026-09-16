import { getConnection } from "../config/database.js";
import { LISTAR_CLIENTES, BUSCAR_CLIENTE } from "../queries/clientes.js";

export async function listarClientes({ offset, limit }) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      LISTAR_CLIENTES,
      { offset, limit },
      { outFormat: 4002 }
    );

    return result.rows ?? [];
  } finally {
    await connection.close();
  }
}

export async function buscarCliente(codigo) {
  const connection = await getConnection();

  try {
    const result = await connection.execute(
      BUSCAR_CLIENTE,
      { codigo },
      { outFormat: 4002 }
    );

    return result.rows?.[0] ?? null;
  } finally {
    await connection.close();
  }
}

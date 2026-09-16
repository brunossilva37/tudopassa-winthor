import * as clientesService from "../services/clientesService.js";

function pagination(req) {
  const page = Math.max(Number.parseInt(req.query.page ?? "1", 10) || 1, 1);
  const limit = Math.min(
    Math.max(Number.parseInt(req.query.limit ?? "100", 10) || 100, 1),
    1000
  );

  return {
    page,
    limit,
    offset: (page - 1) * limit,
  };
}

export async function listar(req, res, next) {
  try {
    const params = pagination(req);
    const data = await clientesService.listarClientes(params);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function buscar(req, res, next) {
  try {
    const data = await clientesService.buscarCliente(req.params.codigo);

    if (!data) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
}

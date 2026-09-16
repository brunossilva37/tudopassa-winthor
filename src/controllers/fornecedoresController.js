import * as fornecedoresService from "../services/fornecedoresService.js";

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
    const data = await fornecedoresService.listarFornecedores(params);

    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function buscar(req, res, next) {
  try {
    const data = await fornecedoresService.buscarFornecedor(req.params.codigo);

    if (!data) {
      return res.status(404).json({
        erro: "Fornecedor não encontrado",
      });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
}

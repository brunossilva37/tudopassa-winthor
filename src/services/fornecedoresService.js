import { isOracle } from "../config/dataSource.js";
import { fornecedoresMock } from "../mocks/fornecedores.js";
import { listarFornecedores as repositoryListarFornecedores, buscarFornecedor as repositoryBuscarFornecedor } from "../repositories/fornecedoresRepository.js";
export async function listarFornecedores({ offset, limit }) { return isOracle() ? repositoryListarFornecedores({offset,limit}) : fornecedoresMock.slice(offset, offset+limit); }
export async function buscarFornecedor(codigo) { return isOracle() ? repositoryBuscarFornecedor(codigo) : (fornecedoresMock.find(x=>String(x.codigo)===String(codigo)) ?? null); }

import { isOracle } from "../config/dataSource.js";
import { produtosMock } from "../mocks/produtos.js";
import { listarProdutos as repositoryListarProdutos, buscarProduto as repositoryBuscarProduto } from "../repositories/produtosRepository.js";
export async function listarProdutos({ offset, limit }) { return isOracle() ? repositoryListarProdutos({offset,limit}) : produtosMock.slice(offset, offset+limit); }
export async function buscarProduto(codigo) { return isOracle() ? repositoryBuscarProduto(codigo) : (produtosMock.find(x=>String(x.referencia)===String(codigo)) ?? null); }

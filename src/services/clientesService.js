import { isOracle } from "../config/dataSource.js";
import { clientesMock } from "../mocks/clientes.js";
import { listarClientes as repositoryListarClientes, buscarCliente as repositoryBuscarCliente } from "../repositories/clientesRepository.js";
export async function listarClientes({ offset, limit }) { return isOracle() ? repositoryListarClientes({offset,limit}) : clientesMock.slice(offset, offset+limit); }
export async function buscarCliente(codigo) { return isOracle() ? repositoryBuscarCliente(codigo) : (clientesMock.find(x=>String(x.codigo)===String(codigo)) ?? null); }

import { ItemCarrinho } from "./ItemCarrinhoInterface.js";
import { Produto } from "./ProdutoInterface.js";
export interface CarrinhoDeComprasInterface<T extends Produto> {
  itens: Map<string, ItemCarrinho<T>>;
  adicionar(produto: T, quantidade?: number): void;
  remover(produtoId: string): boolean;
  atualizarQuantidade(produtoId: string, novaQuantidade: number): void;
  listarItens(): ItemCarrinho<T>[];
  calcularQuantidadeTotal(): number;
  calcularValorTotal(): number;
}

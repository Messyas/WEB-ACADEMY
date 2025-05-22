import { Produto } from "./ProdutoInterface";

export interface CarrinhoDeComprasInterface<T extends Produto> {
  produtos: T[];
  adicionar(item: T): void;
  removerPorIndice(indice: number): boolean;
  calcularQuantidade(): number;
  calcularValorTotal(): number;
}
import { Produto } from "./ProdutoInterface.js";
export interface ItemCarrinho<T extends Produto> {
  produto: T;
  quantidade: number;
}

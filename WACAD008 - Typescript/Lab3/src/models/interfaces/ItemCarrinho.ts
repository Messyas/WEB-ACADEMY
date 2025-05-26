import { Produto } from "./ProdutoInterface";

export interface ItemCarrinho<T extends Produto> {
    produto: T;
    quantidade: number;
}
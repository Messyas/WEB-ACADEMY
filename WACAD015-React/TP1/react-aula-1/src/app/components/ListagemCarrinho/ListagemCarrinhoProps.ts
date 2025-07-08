import { Produto } from "../utils/ProdutoProps";

export interface ListagemCarrinhoProps {
    produtos: Produto[];
    onRemoveProduto: (produtoId: number) => void;
}
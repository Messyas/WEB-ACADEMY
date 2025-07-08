import { Produto } from "../utils/ProdutoProps";

interface ListagemCarrinhoProps {
    produtos: Produto[];
    onRemoveProduto: (produtoId: number) => void;
}

export default ListagemCarrinhoProps;
import { Produto } from "../utils/ProdutoProps";

interface ListagemProdutoProps {
    produto: Produto;
    onAdd: (produto: Produto) => void;
}

export default ListagemProdutoProps;
import { Produto } from "../utils/ProdutoProps";

interface ListagemProdutosProps {
  produto: Produto;
  onAdd: (produto: Produto) => void;
}

export default ListagemProdutosProps;
import CardProduto from "../CardProduto/CardProduto";
import ListagemFavoritos from "../ListagemFavoritos/ListagemFavoritos";

interface IListagemProdutosProps {
  produtos: Produto[];
}

export default function ListagemProdutos({ produtos }: IListagemProdutosProps) {
  return (
    <div className="row row-cols-1 row-cols-lg-2">
      <div className="col-lg-9">
        <h5 className="mb-3">Produtos disponíveis:</h5>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      </div>

      <div className="col-lg-3">
        <ListagemFavoritos />
      </div>
    </div>
  );
}

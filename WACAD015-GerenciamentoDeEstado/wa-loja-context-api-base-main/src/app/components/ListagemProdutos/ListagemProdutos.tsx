// app/components/ListagemProdutos/ListagemProdutos.tsx

import CardProduto from "../CardProduto/CardProduto";
// Assumindo que o nome do componente de resumo seja este
import ListagemFavoritos from "../ListagemFavoritos/ListagemFavoritos";

// 1. Remova 'favoritos' e 'setFavoritos' da interface.
// O componente só precisa saber da lista de produtos a ser exibida.
interface IListagemProdutosProps {
  produtos: Produto[];
}

export default function ListagemProdutos({ produtos }: IListagemProdutosProps) {
  return (
    <div className="row row-cols-1 row-cols-lg-2">
      <div className="col-lg-9">
        <h5 className="mb-3">Produtos disponíveis:</h5>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3">
          {/*
            2. Chame o CardProduto sem passar as props de favoritos.
               Ele agora pega tudo o que precisa do contexto.
          */}
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      </div>

      <div className="col-lg-3">
        {/*
          3. Renderize o componente de favoritos sem passar nenhuma prop.
             Ele também é autossuficiente agora.
             Estou usando o nome 'ListagemFavoritos' que corrigimos no primeiro passo.
             Se o nome for 'ResumoFavoritos', apenas substitua.
        */}
        <ListagemFavoritos />
      </div>
    </div>
  );
}

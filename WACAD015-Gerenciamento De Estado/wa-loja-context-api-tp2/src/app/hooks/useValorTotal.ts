import useFavoritosContext from "./useFavoritosContext";
import { calculaValorComPorcentagemDeDesconto } from "../helpers/calculaPorcentagemDesconto";

const useTotalFavoritos = () => {
  const { favoritos } = useFavoritosContext();

  return favoritos.reduce((acc, produto) => {
    return (
      acc +
      calculaValorComPorcentagemDeDesconto(
        Number(produto.preco),
        produto.desconto
      )
    );
  }, 0);
};

export default useTotalFavoritos;

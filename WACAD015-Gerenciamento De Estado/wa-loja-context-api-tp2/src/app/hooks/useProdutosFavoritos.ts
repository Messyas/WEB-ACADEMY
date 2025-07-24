import useFavoritosContext from "./useFavoritosContext";

const useProdutosFavoritos = () => {
  const { favoritos } = useFavoritosContext();

  return favoritos;
};

export default useProdutosFavoritos;

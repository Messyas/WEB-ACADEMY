import useProdutosFavoritos from "./useProdutosFavoritos";

const useVerificaProdutoFavorito = (id: string) => {
  const favoritos = useProdutosFavoritos();

  return favoritos.some((item) => item.id === id);
};

export default useVerificaProdutoFavorito;

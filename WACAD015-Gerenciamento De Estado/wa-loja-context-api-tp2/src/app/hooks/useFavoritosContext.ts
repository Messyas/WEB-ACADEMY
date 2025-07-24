import { useContext } from "react";
import { FavoritosContext } from "../states/FavoritosProvider";

const useFavoritosContext = () => {
  const favoritosContext = useContext(FavoritosContext);

  return favoritosContext;
};

export default useFavoritosContext;

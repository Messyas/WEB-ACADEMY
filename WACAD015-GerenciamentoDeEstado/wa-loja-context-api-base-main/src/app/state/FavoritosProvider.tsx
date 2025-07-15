import { createContext, useState } from "react";

interface IFavoritos {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritoContent = createContext<IFavoritos>({
  favoritos: [] as Produto[],
  setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

const FavoritosProvider = ({ children }: FavoritosProviderProps) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const values = {
    favoritos,
    setFavoritos,
  };

  return (
    <FavoritoContent.Provider value={values}>
      {children}
    </FavoritoContent.Provider>
  );
};

export default FavoritosProvider;

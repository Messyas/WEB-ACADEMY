"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface IFavoritosContext {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
}

export const FavoritosContext = createContext<IFavoritosContext>({
  favoritos: [],
  setFavoritos: () => {},
});

interface FavoritosProviderProps {
  children: React.ReactNode;
}

export default function FavoritosProvider({
  children,
}: FavoritosProviderProps) {
  const [favoritos, setFavoritos] = useState<Produto[]>(() => {
    if (typeof window !== "undefined") {
      const favoritosSalvos = localStorage.getItem("favoritos");
      if (favoritosSalvos) {
        return JSON.parse(favoritosSalvos);
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }, [favoritos]);

  return (
    <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (context === undefined) {
    throw new Error("Erro");
  }
  return context;
};

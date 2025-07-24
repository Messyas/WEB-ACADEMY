"use client";

import React, { createContext, useState } from "react";

interface IFavoritosContext {
  favoritos: Produto[];
  setFavoritos: React.Dispatch<React.SetStateAction<Produto[]>>;
  adicionar: (produto: Produto) => void;
  remover: (id: string) => void;
}

interface FavoritosContextProps {
  children: React.ReactNode;
}

export const FavoritosContext = createContext<IFavoritosContext>({
  favoritos: [],
  setFavoritos: () => {},
  adicionar: () => {},
  remover: () => {},
});

const FavoritosProvider = ({ children }: FavoritosContextProps) => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);

  const adicionar = (produto: Produto) => {
    setFavoritos((prev) => [...prev, produto]);
  };

  const remover = (id: string) => {
    setFavoritos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        setFavoritos,
        adicionar,
        remover,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosProvider;

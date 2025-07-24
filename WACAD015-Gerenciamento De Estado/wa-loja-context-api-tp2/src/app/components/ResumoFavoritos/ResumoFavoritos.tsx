"use client";

import useFavoritosContext from "@/app/hooks/useFavoritosContext";
import CardProduto from "../CardProduto/CardProduto";

export default function ResumoFavoritos() {
  const { favoritos } = useFavoritosContext();
  const ultimosFavoritos = favoritos.slice(-3).reverse();

  return (
    <>
      <h5 className="mb-3 mt-4 mt-lg-0">Últimos favoritados:</h5>
      <div className="vstack gap-3">
        {ultimosFavoritos.length === 0 ? (
          <div className="card">
            <div className="card-body">
              <p className="text-muted mb-0">Sua lista está vazia</p>
            </div>
          </div>
        ) : (
          ultimosFavoritos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              mostrarImagem={false}
              mostrarBotao={false}
            />
          ))
        )}
      </div>
    </>
  );
}

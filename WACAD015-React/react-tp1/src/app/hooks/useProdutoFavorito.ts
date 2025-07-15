import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProdutoFavorito, getProdutosFavoritos, removeProdutoFavorito } from "../services/produtos";
import { Produto } from "../types/produto";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (produto: Produto) => addProdutoFavorito(produto),
    onSuccess,
    onError,
  });

  return {
    addFavorito: mutate,
    isPending,
  };
}

export function useGetFavoritos() {
  const {
    data: favoritos = [],
    isPending,
    isError,
    refetch,
  } = useQuery<Produto[]>({
    queryKey: ["favoritos"],
    queryFn: getProdutosFavoritos,
  });

  return {
    favoritos,
    isPending,
    isError,
    refetchFavoritos: refetch,
  };
}

export function useRemoveFavorito(onSuccessExtra?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeProdutoFavorito,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritos"] });
      if (onSuccessExtra) onSuccessExtra();
    },
  });

  return { removeFavorito: mutate, isPending };
}

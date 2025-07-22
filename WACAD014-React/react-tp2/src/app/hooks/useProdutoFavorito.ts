import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFavorito,
  getFavoritos,
  removeFavorito,
} from "../services/produtos";
import { Produto } from "../types/produto";

export function useAddFavorito(onSuccess?: () => void, onError?: () => void) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (produto: Produto) => addFavorito(produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listaFavoritos"] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    isPending,
    addFavorito: mutate,
  };
}

export function useFavoritos() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["listaFavoritos"],
    queryFn: () => getFavoritos(),
  });

  return {
    favoritos: data,
    refetchFavoritos: refetch,
    isPending,
    isError,
  };
}

export function useRemoveFavorito(
  onSuccess?: () => void,
  onError?: () => void
) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => removeFavorito(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listaFavoritos"] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onError) onError();
    },
  });

  return {
    isPending,
    removeFavorito: mutate,
  };
}

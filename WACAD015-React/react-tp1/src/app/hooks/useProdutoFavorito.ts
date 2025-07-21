import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFavorito,
  getFavoritos,
  removeFavorito,
} from "../services/produtos";
import { Produto } from "../types/produto";
import { toast } from "react-toastify";

export function useAddFavorito(onSuccess: () => void, onError: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (produto: Produto) => addFavorito(produto),
    onSuccess,
    onError,
  });

  return {
    addFavorito: mutate,
    isPending,
  };
}

export function useFavoritos() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["favoritos"],
    queryFn: getFavoritos,
    initialData: [],
  });

  return {
    favoritos: data,
    refetchFavoritos: refetch,
    isCarregando: isPending,
    isError,
  };
}

export function useRemoveFavorito(refetchFavoritos: () => void) {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => removeFavorito(id),
    onSuccess: () => {
      toast.success("Produto removido com sucesso!");
      refetchFavoritos();
    },
    onError: () => {
      toast.error("Erro ao remover o produto.");
    },
  });

  return {
    remover: mutate,
    isRemovendo: isPending,
  };
}

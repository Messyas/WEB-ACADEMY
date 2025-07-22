import { useQuery } from "@tanstack/react-query";
import { getDetalhesProduto } from "../services/produtos";

export function useDetalhesProduto(nomeProduto: string) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["detalhesProduto"],
    queryFn: () => getDetalhesProduto(nomeProduto),
  });

  return { produto: data, isPending, isError };
}

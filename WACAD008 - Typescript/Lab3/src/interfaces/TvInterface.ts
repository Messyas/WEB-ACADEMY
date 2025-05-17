import { Produto } from "./ProdutoInterface";

export interface TvInterface extends Produto {
    resolucao: number;
    tamanhoPolegadas: string;
}
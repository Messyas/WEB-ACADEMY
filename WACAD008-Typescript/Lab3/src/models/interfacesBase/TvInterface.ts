import { Produto } from "./ProdutoInterface.js";
export interface TvInterface extends Produto {
  resolucao: number;
  tamanhoPolegadas: string;
}

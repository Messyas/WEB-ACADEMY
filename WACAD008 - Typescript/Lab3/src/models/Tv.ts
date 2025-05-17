import { TvInterface } from "../interfaces/TvInterface";

export class Tv implements TvInterface {
  constructor(
    public resolucao: number,
    public tamanhoPolegadas: string,
    public modelo: string,
    public fabricante: string,
    public valor: number
  ) {}
}

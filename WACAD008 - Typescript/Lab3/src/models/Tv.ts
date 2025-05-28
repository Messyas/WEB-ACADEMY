import { TvInterface } from "./interfaces/TvInterface";

let nextId = 1;
export class Tv implements TvInterface {
  public id: string;

  constructor(
    public resolucao: number,
    public tamanhoPolegadas: string,
    public modelo: string,
    public fabricante: string,
    public valor: number
  ) {
    this.id = `Tv-${nextId++}`;
  }
}

import { CelularInterface } from "./interfaces/CelularInterface";

let nextId = 1;
export class Celular implements CelularInterface {
  public id: string;
  
  constructor(
    public memoria: string,
    public modelo: string,
    public fabricante: string,
    public valor: number
  ) {
    this.id = `Celular-${nextId++}`;
  }
}

import { BicicletaInterface } from "./interfaces/Bicicleta";

let nextId = 1;
export class Bicicleta implements BicicletaInterface {
  public id: string;
  constructor(
    public tamanhoDoAro: number,
    public modelo: string,
    public fabricante: string,
    public valor: number
  ) {
     this.id = `Bicicleta-${nextId++}`;
  }
}

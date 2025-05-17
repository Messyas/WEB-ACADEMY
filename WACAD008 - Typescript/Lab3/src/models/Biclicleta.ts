import { BicicletaInterface } from "../interfaces/Bicicleta";

export class Bicicleta implements BicicletaInterface {
  constructor(
    public tamanhoDoAro: number,
    public modelo: string,
    public fabricante: string,
    public valor: number
  ) {}
}

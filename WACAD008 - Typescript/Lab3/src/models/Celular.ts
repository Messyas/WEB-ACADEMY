import { CelularInterface } from "../interfaces/CelularInterface";

export class Celular implements CelularInterface {
  constructor(
    public memoria: string,
    public modelo: string,
    public fabricante: string,
    public valor: number
  ) {}
}

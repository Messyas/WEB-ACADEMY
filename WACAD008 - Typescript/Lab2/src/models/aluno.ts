export class Aluno {
  constructor(
    private id: string,
    private nome: string,
    private idade: number,
    private _altura: number,
    private _peso: number
  ) {}

  getAltura(): number {
    return this._altura;
  }

  getPeso(): number {
    return this._peso
  }
}

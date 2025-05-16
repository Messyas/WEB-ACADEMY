export class Aluno {
  constructor(
    private readonly _id: string | number,
    private _nome: string,
    private _idade: number,
    private _altura: number,
    private _peso: number
  ) {}

  getId(): string | number {
    return this._id;
  }

  getNome() {
    return this._nome;
  }
  getIdade(): number {
    return this._idade;
  }

  getAltura(): number {
    return this._altura;
  }

  getPeso(): number {
    return this._peso;
  }
}

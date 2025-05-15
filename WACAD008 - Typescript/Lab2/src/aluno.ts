export class Aluno {
    id: string;
    nome: string;
    idade: number;
    altura: number;
    peso: number;

    constructor (id: string, nome: string, idade: number, altura: number, peso: number) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }

    get alturaALuno (): string {
        return (this.altura /100).toFixed(2);
    }

}
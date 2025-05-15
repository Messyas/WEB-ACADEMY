import { Aluno } from "./aluno"
class turma {
    id: string;
    nome: string;
    alunos: Aluno[];

    constructor (id: string, nome: string, alunos?: Aluno[] ) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos ?? [];
    }

    addAluno (aluno: Aluno): void {
        this.alunos.push(aluno);
    }

    getNumALunos (): number {
        return this.alunos.length;
    }

    getMediaIdades () {
        
    }

    getMediaAlturas () {

    }

    getMediaPesos() {

    }
}
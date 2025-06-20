import { Aluno } from "../../entities/Aluno.ts";
import { Turma } from "../../entities/Turma.ts";
import { renderResumo, renderTabela } from "../views/render.ts";

declare const bootstrap: any;
export class AlunoController {
  private currentEditId: string | null = null;

  constructor(private turma: Turma) {}

  public init(): void {
    const form = document.getElementById("formAluno") as HTMLFormElement;
    const tabela = document.getElementById("tabela-alunos") as HTMLTableSectionElement;

    form.addEventListener("submit", (e) => this.handleSubmit(e));
    tabela.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("btn-excluir")) this.handleDelete(e);
      if (target.classList.contains("btn-editar")) this.handleUpdateAluno(e);
    });
  }

  private handleDelete(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("btn-excluir")) return;

    const tr = target.closest("tr")!;
    const id = tr.dataset.id!;
    this.turma.removeAluno(id);

    renderResumo(this.turma);
    renderTabela(this.turma);
  }

  private handleUpdateAluno(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const tr = target.closest("tr")!;
    const id = tr.dataset.id!;

    this.currentEditId = id;

    const aluno = this.turma.getAlunos().find((a) => a.getId() === id)!;
    (document.getElementById("inputNome") as HTMLInputElement).value = aluno.getNome();
    (document.getElementById("inputIdade") as HTMLInputElement).value = String(aluno.getIdade());
    (document.getElementById("inputAltura") as HTMLInputElement).value = (aluno.getAltura() / 100).toString();
    (document.getElementById("inputPeso") as HTMLInputElement).value = (aluno.getPeso() / 1000).toString();

    const modalEl = document.getElementById("modalAluno")!;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();

    const nome = (document.getElementById("inputNome") as HTMLInputElement).value;
    const idade = Number((document.getElementById("inputIdade") as HTMLInputElement).value);
    const altura = Number((document.getElementById("inputAltura") as HTMLInputElement).value) * 100;
    const peso = Number((document.getElementById("inputPeso") as HTMLInputElement).value) * 1000;

    try {
      // edicao
      if (this.currentEditId) {
        this.turma.updateAluno(this.currentEditId, nome, idade, altura, peso);
        this.currentEditId = null;
        this.afterSave();
        return;
      }

      //inserir
      const aluno = new Aluno(nome, idade, altura, peso);
      this.turma.addAluno(aluno);
      this.afterSave();
    } catch (err: any) {
      alert(err.message);
    }
  }

  private afterSave(): void {
    renderResumo(this.turma);
    renderTabela(this.turma);

    const form = document.getElementById("formAluno") as HTMLFormElement;
    form.reset();

    const modalEl = document.getElementById("modalAluno")!;
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}

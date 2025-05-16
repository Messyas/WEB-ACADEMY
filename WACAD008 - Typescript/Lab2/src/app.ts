import { Turma } from "./models/turma.ts";
import { Aluno } from "./models/aluno.ts";

declare const bootstrap: any;

const turma = new Turma("T1", "Turma EF");

const totalAlunosEl = document.getElementById(
  "total-alunos"
)! as HTMLParagraphElement;
const mediaAlturasEl = document.getElementById(
  "media-alturas"
)! as HTMLParagraphElement;
const mediaPesosEl = document.getElementById(
  "media-pesos"
)! as HTMLParagraphElement;
const tabelaAlunosEl = document.getElementById(
  "tabela-alunos"
)! as HTMLTableSectionElement;
const formAluno = document.getElementById("formAluno")! as HTMLFormElement;
const inpNome = document.getElementById("inputNome")! as HTMLInputElement;
const inpIdade = document.getElementById("inputIdade")! as HTMLInputElement;
const inpAltura = document.getElementById("inputAltura")! as HTMLInputElement;
const inpPeso = document.getElementById("inputPeso")! as HTMLInputElement;

function atualizarResumo() {
  totalAlunosEl.textContent = turma.getNumAlunos().toString();
  mediaAlturasEl.textContent = turma.getMediaAlturas();
  mediaPesosEl.textContent = turma.getMediaPesos();
}

function atualizarTabela() {
  tabelaAlunosEl.innerHTML = "";
  turma.getAlunos().forEach((aluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.getId()}</td>
      <td>${aluno.getNome()}</td>
      <td>${aluno.getIdade()}</td>
      <td>${(aluno.getAltura() / 100).toFixed(2)}</td>
      <td>${(aluno.getPeso() / 1000).toFixed(3)}</td>
    `;
    tabelaAlunosEl.appendChild(tr);
  });
}

formAluno.addEventListener("submit", (e) => {
  e.preventDefault();

  const alturaCm = Number(inpAltura.value) * 100;
  const pesoG = Number(inpPeso.value) * 1000;

  const aluno = new Aluno(
    crypto.randomUUID(),
    inpNome.value,
    Number(inpIdade.value),
    alturaCm,
    pesoG
  );

  turma.addAluno(aluno);
  atualizarResumo();
  atualizarTabela();
  formAluno.reset();

  const modalEl = document.getElementById("modalAluno")!;
  const modal = bootstrap.Modal.getInstance(modalEl) as any;
  modal.hide();
});


atualizarResumo();

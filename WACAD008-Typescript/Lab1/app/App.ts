import { Task } from "./entity/Task.ts";
import { TaskId } from "./value-object/TaskId.ts";
import { TaskRepository } from "./repository/TaskRepository.ts";
import { FormHandler } from "./ui/FormHandler.ts";
import { Renderer } from "./ui/Renderer.ts";

const repo = new TaskRepository();
const form = new FormHandler(
  document.getElementById("title") as HTMLInputElement,
  document.getElementById("init-date") as HTMLInputElement,
  document.getElementById("final-date") as HTMLInputElement,
  document.getElementById("description") as HTMLInputElement
);
const view = new Renderer(
  document.querySelector(".list-itens-container") as HTMLDivElement
);
const submit = document.getElementById("button-add") as HTMLButtonElement;

submit.addEventListener("click", () => {
  const { id, title, ini, fim, desc } = form.readValues();
  const existing = repo.findById(id);

  if (existing) {
    existing.update(title, ini, fim, desc);
  } else {
    repo.add(new Task(id, title, ini, fim, desc));
  }

  form.clear();
  view.render(repo.getAll(), edit, remove);
});

function edit(id: string): void {
  const task = repo.findById(new TaskId(id));
  if (!task) return;
  form.fill(task);
}

function remove(id: string): void {
  repo.remove(new TaskId(id));
  view.render(repo.getAll(), edit, remove);
}

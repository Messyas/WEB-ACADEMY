import { Task } from "../entity/Task.ts";
import { TaskId } from "../value-object/TaskId.ts";

export class FormHandler {
  constructor(
    private readonly titleInput: HTMLInputElement,
    private readonly iniInput: HTMLInputElement,
    private readonly fimInput: HTMLInputElement,
    private readonly descInput: HTMLInputElement
  ) {}

  readValues(): {
    id: TaskId;
    title: string;
    ini: Date;
    fim: Date;
    desc: string;
  } {
    const rawId = this.titleInput.dataset.editingId;
    const id = rawId ? new TaskId(rawId) : new TaskId(crypto.randomUUID());
    return {
      id,
      title: this.titleInput.value,
      ini: new Date(this.iniInput.value),
      fim: new Date(this.fimInput.value),
      desc: this.descInput.value,
    };
  }

  clear(): void {
    this.titleInput.value = "";
    this.titleInput.removeAttribute("data-editing-id");
    this.iniInput.value = "";
    this.fimInput.value = "";
    this.descInput.value = "";
  }

  fill(task: Task): void {
    const [, title, ini, fim, desc] = task.toTuple();
    this.titleInput.value = title;
    this.titleInput.setAttribute("data-editing-id", task.getId().toString());
    this.iniInput.value = ini.toISOString().slice(0, 16);
    this.fimInput.value = fim.toISOString().slice(0, 10);
    this.descInput.value = desc;
  }
}

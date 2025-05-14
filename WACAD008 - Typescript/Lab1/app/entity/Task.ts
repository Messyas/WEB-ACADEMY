import { TaskId } from '../value-object/TaskId.ts';

export class Task {
  constructor(
    private readonly id: TaskId,
    private title: string,
    private ini: Date,
    private fim: Date,
    private description: string
  ) {}

  getId(): TaskId { return this.id; }

  update(
    title?: string,
    ini?: Date,
    fim?: Date,
    description?: string
  ): void {
    if (title)       this.title       = title;
    if (ini)         this.ini         = ini;
    if (fim)         this.fim         = fim;
    if (description) this.description = description;
  }

  toTuple(): [string, string, Date, Date, string] {
    return [
      this.id.toString(),
      this.title,
      this.ini,
      this.fim,
      this.description
    ];
  }
}
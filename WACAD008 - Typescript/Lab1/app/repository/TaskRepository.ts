import { Task } from "../entity/Task.ts";
import { TaskId } from "../value-object/TaskId.ts";

export class TaskRepository {
  private readonly tasks = new Map<string, Task>();

  add(task: Task): void {
    this.tasks.set(task.getId().toString(), task);
  }

  findById(id: TaskId): Task | undefined {
    return this.tasks.get(id.toString());
  }

  remove(id: TaskId): void {
    this.tasks.delete(id.toString());
  }

  getAll(): Task[] {
    return Array.from(this.tasks.values());
  }
}

export class TaskId {
  constructor(private readonly value: string) {
    if (!value) throw new Error('TaskId não pode estar vazio');
  }
  toString() { return this.value; }
}
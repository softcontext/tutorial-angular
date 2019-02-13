export class Todo {
  id: string;
  task: string;
  date: Date;

  constructor(task: string = '') {
    this.id = Date.now() + ':' + Math.random().toFixed(5);
    this.task = task;
    this.date = new Date();
  }
}

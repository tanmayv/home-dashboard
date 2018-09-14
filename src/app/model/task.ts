import { Guid } from './guid';

export class Task {
  id: string;
  body: string;
  completed: boolean;
  createdOn: number;
  completedOn: number;
  tag: string[];


  constructor(body: string, tag: string[] = []) {
    this.id = Guid.newGuid();
    this.body = body;
    this.tag = tag;
    this.completed = false;
    this.createdOn = new Date().getTime();
    this.completedOn = -1;
  }

  static from(task: Task): Task {
    const t: Task = new Task(task.body, task.tag);
    t.id = task.id;
    t.completedOn = task.completedOn;
    t.completed = task.completed;
    t.createdOn = task.createdOn;
    return t;
  }

  getData(): object {
    const result = {};
    Object.keys(this).map(key => result[key] = this[key]);
    return result;
  }
}

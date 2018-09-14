import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from '../model/task';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.css' ]
})
export class TaskListComponent implements OnInit {
  private taskCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<any>;
  constructor(store: AngularFirestore) {
    this.taskCollection = store.collection('tasks');
  }

  ngOnInit() {
    // const newTask = new Task('I\'m the first task ever created');
    // this.taskCollection.add(newTask.getData());
    this.tasks = this.taskCollection.valueChanges();
    // this.taskCollection.doc(newTask.id).set(newTask.getData());
  }
}

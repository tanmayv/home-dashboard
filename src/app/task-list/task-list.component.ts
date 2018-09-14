import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task } from '../model/task';
import { Observable } from 'rxjs/index';
import { Utility } from '../utility';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: [ './task-list.component.css' ]
})
export class TaskListComponent implements OnInit {
  private pendingTaskCollection: AngularFirestoreCollection<Task>;
  private urgentTaskCollection: AngularFirestoreCollection<Task>;
  private completedTaskCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<any>;
  completedTask: Observable<any>;
  urgentTask: Observable<any>;
  date = new Date();
  constructor(store: AngularFirestore) {
    console.log('date key', Utility.todayDateKey());
    this.pendingTaskCollection = store.collection(Utility.todayDateKey(), ref => ref
      .where('completed', '==', false)
      .where('urgent', '==', false)
    );
    this.urgentTaskCollection = store.collection(Utility.todayDateKey(), ref => ref
      .where('completed', '==', false)
      .where('urgent', '==', true)
    );
    this.completedTaskCollection = store.collection(Utility.todayDateKey(), ref => ref.where('completed', '==', true));
  }

  ngOnInit() {
    // const newTask = new Task('I\'m the first task ever created');
    // this.taskCollection.add(newTask.getData());
    this.tasks = this.pendingTaskCollection.valueChanges();
    this.completedTask = this.completedTaskCollection.valueChanges();
    this.urgentTask = this.urgentTaskCollection.valueChanges();
    // this.taskCollection.doc(newTask.id).set(newTask.getData());
  }
}

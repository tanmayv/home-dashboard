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
  tasks = [];
  completedTask: Observable<any>;
  urgentTask = [];
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
    this.pendingTaskCollection.valueChanges().forEach((data) => {
      this.tasks = data;
    });
    this.completedTask = this.completedTaskCollection.valueChanges();
    this.urgentTaskCollection.valueChanges().forEach((data) => {
      this.urgentTask = data;
    });
  }
}

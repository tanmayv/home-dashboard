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

  constructor(private store: AngularFirestore) {
    console.log('date key', Utility.todayDateKey());

  }

  ngOnInit() {
    this.updateSubscibers();
    setInterval(() => {
      this.updateSubscibers();
    }, 1000 * 60 * 60 * 30);
  }

  updateSubscibers() {
    this.pendingTaskCollection = this.store.collection(Utility.todayDateKey(), ref => ref
      .where('completed', '==', false)
      .where('urgent', '==', false)
    );
    this.urgentTaskCollection = this.store.collection(Utility.todayDateKey(), ref => ref
      .where('completed', '==', false)
      .where('urgent', '==', true)
    );
    this.completedTaskCollection = this.store.collection(Utility.todayDateKey(), ref => ref.where('completed', '==', true));
    this.pendingTaskCollection.valueChanges().forEach((data) => {
      this.tasks = data;
    });
    this.completedTask = this.completedTaskCollection.valueChanges();
    this.urgentTaskCollection.valueChanges().forEach((data) => {
      this.urgentTask = data;
    });
  }
}

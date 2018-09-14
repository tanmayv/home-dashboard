import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskComponent } from './task.component';
import { DateComponent } from '../date/date.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskComponent,
    DateComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  ],
  exports: [
    TaskListComponent,
    TaskComponent,
    DateComponent
  ],
  providers: []
})
export class TaskModule {
}

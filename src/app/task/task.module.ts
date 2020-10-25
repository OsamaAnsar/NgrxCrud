import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../store/services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { taskReducer } from '../store/reducers/tasks.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from '../store/effects/tasks.effects';
import { TasksListComponent } from '../components/tasks-list/tasks-list.component';
import { CreateTaskComponent } from '../components/create-task/create-task.component';


@NgModule({
  declarations: [TasksListComponent,CreateTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  providers: [TaskService],
  exports:[TasksListComponent,CreateTaskComponent]
})
export class TaskModule { }

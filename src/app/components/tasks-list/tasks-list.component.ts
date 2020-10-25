import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/store/model/task.model';
import { TaskService } from 'src/app/store/services/task.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { getAllTasks } from 'src/app/store/selectors/tasks.selectors';
import { TaskAction } from 'src/app/store/actions/tasks.action';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {


  tasks$: Task[];

  taskToBeUpdated: Task;

  isUpdateActivated = false;

  constructor(private taskService: TaskService, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(getAllTasks).subscribe(task => this.tasks$ = task);
    console.log('hello', this.tasks$);
  }

  deleteTask(TaskId: string) {
    this.store.dispatch(TaskAction.deleteTask({ TaskId }));
  }

  showUpdateForm(task: Task) {
    this.taskToBeUpdated = { ...task };
    this.isUpdateActivated = true;
  }

  updateTask(updateForm) {
    const update: Update<Task> = {
      id: this.taskToBeUpdated.id,
      changes: {
        ...this.taskToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(TaskAction.updateTask({ update }));

    this.isUpdateActivated = false;
    this.taskToBeUpdated = null;
  }

}

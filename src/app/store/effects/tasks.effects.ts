import { TaskAction, TasksLoaded, updateTask } from '../actions/tasks.action';
import { TaskService } from './../services/task.service';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';

import { concatMap, map, tap, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TaskEffects {

  @Effect()
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.loadTasks),
      concatMap(() => this.taskService.getAllTasks()),
      map(Tasks => TaskAction.TasksLoaded({ Tasks }))
    )
  );
  @Effect()
  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.createTask),
      concatMap((action) => this.taskService.createTask(action.task)),
      tap(() => this.router.navigateByUrl('/tasks'))
    ),
    { dispatch: false }
  );
  @Effect()
  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.deleteTask),
      switchMap((action) => this.taskService.deleteTask(action.TaskId))
    ),
    { dispatch: false }
  );
  @Effect({ dispatch: false })
  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskAction.updateTask),
      concatMap((action) => this.taskService.updateTask(action.update.id, action.update.changes))
    ),
  );

  constructor(private taskService: TaskService, private actions$: Actions, private router: Router) { }
}

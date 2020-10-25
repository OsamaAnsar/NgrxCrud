import { areTasksLoaded } from '../store/selectors/tasks.selectors';
import { loadTasks } from '../store/actions/tasks.action';
import { AppState } from './../store/reducers/index';
import { Task } from '../store/model/task.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';

@Injectable()
export class TaskResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        select(areTasksLoaded),
        tap((tasksLoaded) => {
          if (!tasksLoaded) {
            this.store.dispatch(loadTasks());
          }

        }),
        filter(tasksLoaded => tasksLoaded),
        first()
      );
  }
}
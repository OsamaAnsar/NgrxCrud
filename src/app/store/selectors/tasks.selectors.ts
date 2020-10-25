import { TaskState } from '../reducers/tasks.reducer';
import { Task } from '../model/task.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll, selectIds } from '../reducers/tasks.reducer';
import { AppState } from '../reducers';

export const taskFeatureSelector = createFeatureSelector<TaskState>('tasks');

export const getAllTasks = createSelector(
  taskFeatureSelector,
  selectAll
);

export const areTasksLoaded = createSelector(
  taskFeatureSelector,
  state => state.tasksLoaded
);
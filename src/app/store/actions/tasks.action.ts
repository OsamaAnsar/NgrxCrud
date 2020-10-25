import { TaskActionTypes } from './action-types';
import { Task } from '../model/task.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

export const loadTasks = createAction(
    TaskActionTypes.LOAD_Tasks,
);

export const TasksLoaded = createAction(
    TaskActionTypes.TASKS_LOADED_SUCCESSFULLY,
    props<{ Tasks: Task[] }>()
);

export const createTask = createAction(
    TaskActionTypes.CREATE_Task,
    props<{ task: Task }>()
);

export const deleteTask = createAction(
    TaskActionTypes.DELETE_Task,
    props<{ TaskId: string }>()
);

export const updateTask = createAction(
    TaskActionTypes.UPDATE_Task,
    props<{ update: Update<Task> }>()
);

export const TaskAction = {
    loadTasks,
    TasksLoaded,
    createTask,
    deleteTask,
    updateTask
};
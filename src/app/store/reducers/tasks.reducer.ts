import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Task } from '../model/task.model';
import { TaskAction, TasksLoaded } from '../actions/tasks.action';

export interface TaskState extends EntityState<Task> {
    tasksLoaded: boolean;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>();

export const initialState = adapter.getInitialState({
    tasksLoaded: false
});

export const taskReducer = createReducer(
    initialState,

    on(TaskAction.TasksLoaded, (state, action) => {
        return adapter.addAll(
            action.Tasks,
            { ...state, tasksLoaded: true }
        );
    }),

    on(TaskAction.createTask, (state, action) => {
        return adapter.addOne(action.task, state);
    }),

    on(TaskAction.deleteTask, (state, action) => {
        return adapter.removeOne(action.TaskId, state);
    }),

    on(TaskAction.updateTask, (state, action) => {
        return adapter.updateOne(action.update, state);
    })
);

export const { selectAll, selectIds } = adapter.getSelectors();
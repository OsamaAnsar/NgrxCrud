import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TaskState, taskReducer } from './tasks.reducer';


export interface AppState {


}

export const reducers: ActionReducerMap<AppState> = {


};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

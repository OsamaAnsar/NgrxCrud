import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {  metaReducers, reducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskResolver } from './task/task.resolver';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskModule } from './task/task.module';
import { EffectsModule } from '@ngrx/effects';


const routes = [
  {
    path: 'tasks',
    component: TasksListComponent,
    resolve: {
      tasks: TaskResolver
    }
  },
  {path: 'create-task', component: CreateTaskComponent},
  {path: '**', redirectTo: 'tasks'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers,runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    } }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ReactiveFormsModule,
    TaskModule,
    HttpClientModule,
    EffectsModule.forRoot([])
  ],
  providers: [TaskResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }

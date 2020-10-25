import { Injectable } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {


  constructor(private http: HttpClient) {

  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasks');
  }

  createTask(task: Task): Observable<Task> {
    console.log(task);
    return this.http.post<Task>('http://localhost:3000/tasks', task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete('http://localhost:3000/tasks/' + taskId);
  }

  updateTask(taskId: string | number, changes: Partial<Task>): Observable<any> {
    return this.http.put('http://localhost:3000/tasks/' + taskId, changes);
  }
}



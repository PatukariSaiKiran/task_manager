import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }


  addTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task);
  }

updateTask(id: string, task: Partial<Task>): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}, task);
}

}

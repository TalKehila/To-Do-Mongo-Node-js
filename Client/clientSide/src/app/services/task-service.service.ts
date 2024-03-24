import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Task from '../model/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  private url = 'http://localhost:8080/api/task/';

  constructor(private httpService: HttpClient) {}

  getalltask(token: string): Observable<Task[]> {
    // Accept token as parameter
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set Authorization header
    return this.httpService.get<Task[]>(this.url, { headers }); // Send token in headers
  }

  addTask(task: Task, token: string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpService.post<Task>(this.url, task, { headers });
  }
  deletetask(id: number, token: string): Observable<Task> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpService.delete<Task>(`${this.url}/${id}`, { headers });
  }
}

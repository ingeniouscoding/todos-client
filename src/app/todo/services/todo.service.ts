import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CreateTodoDto, Todo } from '../models';

const url = environment.url + 'todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(url);
  }

  create(dto: CreateTodoDto): Observable<Todo> {
    return this.http.post<Todo>(url, dto);
  }

  remove(id: string): Observable<any> {
    return this.http.delete<any>(`${url}/${id}`);
  }
}

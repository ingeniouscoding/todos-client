import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CreateTodoDto, TodoDto, UpdateTodoDto } from '../models';

const url = environment.url + '/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(url);
  }

  getById(id: string) {
    return this.http.get<TodoDto>(`${url}/${id}`);
  }

  create(dto: CreateTodoDto): Observable<TodoDto> {
    return this.http.post<TodoDto>(url, dto);
  }

  update(dto: UpdateTodoDto) {
    const { id, ...todo } = dto;
    return this.http.patch<TodoDto>(`${url}/${id}`, todo);
  };

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }
}

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

  getById(guid: string) {
    return this.http.get<TodoDto>(`${url}/${guid}`);
  }

  create(dto: CreateTodoDto): Observable<TodoDto> {
    return this.http.post<TodoDto>(url, dto);
  }

  update(dto: UpdateTodoDto) {
    const { guid, ...todo } = dto;
    return this.http.patch<TodoDto>(`${url}/${guid}`, todo);
  }

  complete(gui: string): Observable<void> {
    return this.http.post<void>(`${url}/${gui}/complete`, {});
  }

  uncomplete(guid: string): Observable<void> {
    return this.http.post<void>(`${url}/${guid}/uncomplete`, {});
  }

  remove(guid: string): Observable<void> {
    return this.http.delete<void>(`${url}/${guid}`);
  }
}

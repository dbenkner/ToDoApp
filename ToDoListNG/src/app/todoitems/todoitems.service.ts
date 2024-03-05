import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toDoItemDTO } from './DTOs/todoitemDTO';
import { Observable } from 'rxjs';
import { GlobalService } from '../core/global.service';
import { ToDoItems } from './todoitems';

@Injectable({
  providedIn: 'root'
})
export class TodoitemsService {
  get url() {return `${this.globalSvc.config.baseurl}/todoitems`;};
  toDoId:number = 0;
  constructor(
    private http:HttpClient,
    private globalSvc: GlobalService
  ) { }

  newToDoItem(ToDoItemDto:toDoItemDTO) : Observable<any>{
    return this.http.post(this.url, ToDoItemDto) as Observable<any>;
  }
  completeToDoItem(id:number) : Observable<ToDoItems>{
    return this.http.put(`${this.url}/comp/${id}`, id) as Observable<ToDoItems>;
  }
}

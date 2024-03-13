import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, config } from 'rxjs';
import { GlobalService } from '../core/global.service';
import { ToDo } from './todo';
import { NewToDoDto } from './DTOs/newTodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  get url() {return `${this.globalSvc.config.baseurl}/todo`;}
  constructor(private http: HttpClient, private globalSvc: GlobalService){}

  getToDosByUserId(id:number):Observable<ToDo[]> {
    return this.http.get(`${this.url}/u/${id}`) as Observable<ToDo[]>
  }
  createNewToDo(toDo:NewToDoDto):Observable<ToDo> {
    return this.http.post(`${this.url}`, toDo) as Observable<ToDo>;
  }
  getToDoById(id:number):Observable<ToDo>{
    return this.http.get(`${this.url}/${id}`) as Observable<ToDo>;
  }
  markComplete(id:number):Observable<ToDo>{
    return this.http.put(`${this.url}/comp/${id}`, id) as Observable<ToDo>
  }
  editToDo(toDo:ToDo) :Observable<any>{
    return this.http.put(`${this.url}/${toDo.id}`, toDo) as Observable<any>;
  }
}

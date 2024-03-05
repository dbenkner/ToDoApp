import { Component } from '@angular/core';
import { NewToDoDto } from '../DTOs/newTodo';
import { GlobalService } from 'src/app/core/global.service';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {
  toDoDTO:NewToDoDto = new NewToDoDto;
  message:string = "";

  constructor(
    private globalSvc: GlobalService,
    private toDoSvc: TodoService,
    private route: Router
  ){}
  ngOnInit(): void {
    if(this.globalSvc.loggedInUser === null) {
      this.route.navigate(['/login'])
    }
  }
  newToDo():void {
    this.toDoDTO.userId = this.globalSvc.loggedInUser.id;
    this.toDoSvc.createNewToDo(this.toDoDTO).subscribe({
      next:(res) => {
        console.debug(res);
        this.route.navigate(['/listbyuid'])
      },
      error:(err) => {
        console.error(err);
        this.message = "Sorry something went wrong";
      }
    });
  }
}

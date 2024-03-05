import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { TodoitemsService } from '../todoitems.service';
import { ToDoItems } from '../todoitems';
import { toDoItemDTO } from '../DTOs/todoitemDTO';

@Component({
  selector: 'app-new-todo-item',
  templateUrl: './new-todo-item.component.html',
  styleUrls: ['./new-todo-item.component.css']
})
export class NewTodoItemComponent {

  toDoItem:ToDoItems = new ToDoItems();
  ToDoItemDto: toDoItemDTO = new toDoItemDTO();

  constructor(private globalSvc:GlobalService,
    private toDoItemSvc:TodoitemsService,
    private router:Router){}



    newToDoItem():void {
      this.ToDoItemDto.toDoId = this.toDoItemSvc.toDoId;
      this.toDoItemSvc.newToDoItem(this.ToDoItemDto).subscribe({
        next:(res) => {
          console.debug(res);
          this.router.navigate([`/todo/${res.toDoId}`])
        },
        error:(err) => {
          console.error(err);
        }
      });
    }
}

import { Component } from '@angular/core';
import { ToDo } from '../todo';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { TodoService } from '../todo.service';
import { TodoitemsService } from 'src/app/todoitems/todoitems.service';
import { toDoItemDTO } from 'src/app/todoitems/DTOs/todoitemDTO';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent {
  toDo!:ToDo;
  allComplete:boolean = false;
  toDoItems:any[] = [];
  newItemBtn:boolean = false;
  newItemDTO: toDoItemDTO = new toDoItemDTO();
  editToDo: Boolean = false;

  constructor(
    private glovalSvc: GlobalService,
    private toDoSvc: TodoService,
    private toDoItemSvc: TodoitemsService,
    private router: ActivatedRoute,
    private route: Router) {}

    ngOnInit():void {
      if(this.glovalSvc.loggedInUser === null) {
        this.route.navigate(['/login']);
      }
      this.onRefresh();
    }
    onRefresh():void{
      let id:number = this.router.snapshot.params['id'];
      console.log(id);
      this.toDoSvc.getToDoById(id).subscribe({
        next:(res) => {
          this.toDo = res;
          console.debug(res);
          this.toDoItemSvc.toDoId = res.id;
          for(let item of this.toDo.items!) {
            console.log(item.id);
            item.edit = true;
            if(item.isComplete === false) {
              this.allComplete = false;
              //break;
            }
            else {
              this.allComplete = true;
            }
          }
        },
        error:(err) => {
          console.error(err);
        }
      });
    }
    markComplete(id:number):void {
      this.toDoItemSvc.completeToDoItem(id).subscribe({
        next:(res) => {
          console.log(res);
          this.ngOnInit();
        },
        error:(err) => {
          console.error(err);
        }
      });
    }
    completeToDo(id:number){
      this.toDoSvc.markComplete(id).subscribe({
        next:(res) => {
          console.debug(res);
          this.ngOnInit();
        },
        error:(err) => {
          console.error(err);
        }
      });
    }
    editToDoBtn():void {
      this.editToDo = true;
    }
    submitToDoEdit():void{
      this.toDoSvc.editToDo(this.toDo).subscribe({
        next:(res)=>{
          console.log(res);
          this.editToDo = false;
        },
        error:(err) => {
          console.error(err),
          this.editToDo = false;
        }
      });
    }
    editToDoItem(id:number):void{
      console.log(this.toDo.items?.find(x => x.id == id)?.edit);
      this.toDo.items!.find(x => x.id == id)!.edit = false;
    }
    submitToDoItem(id:number):void {
      this.toDoItemSvc.editToDoItem(this.toDo.items?.find(x => x.id == id)!).subscribe({
        next:(res) => {
          console.log(res);
          this.toDo.items!.find(x => x.id == id)!.edit = true;
        },
        error:(err) => {
          console.error(err);
        }
      });
    }
    newItem():void {
      this.newItemBtn = true;
    }
    submitNewItem():void {
      this.newItemDTO.toDoId = this.toDo.id;
      this.toDoItemSvc.newToDoItem(this.newItemDTO).subscribe({
        next:(res) => {
          console.log(res);
          this.newItemBtn = false;
          this.ngOnInit();
        },
        error:(err) => {
          console.error(err);
        }
      });
    }
}

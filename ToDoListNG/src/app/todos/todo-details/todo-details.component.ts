import { Component } from '@angular/core';
import { ToDo } from '../todo';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { TodoService } from '../todo.service';
import { TodoitemsService } from 'src/app/todoitems/todoitems.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent {
  toDo!:ToDo;
  allComplete:boolean = false;

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
            if(item.isComplete === false) {
              this.allComplete = false;
              break;
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
}

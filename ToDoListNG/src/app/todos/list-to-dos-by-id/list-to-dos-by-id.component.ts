import { Component } from '@angular/core';
import { ToDo } from '../todo';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/global.service';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-to-dos-by-id',
  templateUrl: './list-to-dos-by-id.component.html',
  styleUrls: ['./list-to-dos-by-id.component.css']
})
export class ListToDosByIdComponent {
  ToDos:ToDo[] = [];
  showComplete:boolean = false;

  constructor(private http:HttpClient, private globalSvc:GlobalService, private toDoSvc:TodoService, private route:Router ) {}

  ngOnInit() {
    if(this.globalSvc.loggedInUser === null){
      this.route.navigate(['/login']);
    }
    this.onRefresh();
  }
  showCompletes():void {
    if (this.showComplete === false) {
      this.showComplete = true;
    }
    else {
      this.showComplete = false;
    }
  }
  onRefresh():void {
    this.toDoSvc.getToDosByUserId(this.globalSvc.loggedInUser.id).subscribe({
      next:(res) => {
        this.ToDos = res;
        console.log(this.ToDos);
      },
      error:(err) => {
        console.error(err);
      },
    });
  }
}

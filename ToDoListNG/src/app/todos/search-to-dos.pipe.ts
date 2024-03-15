import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from './todo';

@Pipe({
  name: 'searchToDos'
})
export class SearchToDosPipe implements PipeTransform {

  transform(toDosList:ToDo[], search:string): ToDo[] {
    if(search === "") {
      return toDosList;
    }
    search = search.toLowerCase()
    let res:ToDo[] = [];
    for(let toDo of toDosList) {
      if(toDo.name.toLowerCase().includes(search) || toDo.description?.toLowerCase().includes(search)){
        res.push(toDo);
      }
    } 
    return res;
  }

}

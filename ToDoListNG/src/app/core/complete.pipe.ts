import { Pipe, PipeTransform } from '@angular/core';
import { ToDo } from '../todos/todo';

@Pipe({
  name: 'complete'
})
export class CompletePipe implements PipeTransform {

  transform(showComp:any[], showComplete:boolean): ToDo[] {
    let res:ToDo[] = [];
    showComp.forEach(toDo => {
      if(showComplete === false) {
        if(toDo.isComplete === false) {
          res.push(toDo);
        }
      }
      else {
        res.push(toDo)
      }

    });
    return res;
  }
}

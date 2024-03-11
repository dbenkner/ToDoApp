import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoBg'
})
export class TodoBgPipe implements PipeTransform {

  transform(priority:number): string {
    switch(priority){
      case(0):
      {
        return "blue-bg";
      }
      case(1):
      {
        return "yellow-bg";
      }
      case(2):
      {
        return "orange-bg";
      }
      case(3):{
        return "red-bg";
      }
      default: {
        return "white-bg";
      }
    }
  }

}

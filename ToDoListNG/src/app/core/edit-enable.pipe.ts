import { Pipe, PipeTransform } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Pipe({
  name: 'editEnable'
})
export class EditEnablePipe implements PipeTransform {

  transform(edit:boolean): string|any {
    if(edit === true) {
      return "disabled";
    }
    else {
      return null;
    }
  }

}

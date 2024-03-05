import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prioritylevel'
})
export class PrioritylevelPipe implements PipeTransform {

  transform(prioritylevel:number): string {
    switch(prioritylevel) {
      case(0) : {
        return "Low";
      }
      case(1) : {
        return "Medium";
      }
      case(2) : {
        return "High";
      }
      case(3) : {
        return "Critical";
      }
      default : {
        return "N/A";
      }
    }
  }

}

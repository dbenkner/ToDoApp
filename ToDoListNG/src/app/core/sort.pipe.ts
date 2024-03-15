import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(sortCol:any[], sortAsc:boolean, sortTerm:any ): any[] {
    
    sortCol.sort((a,b) => {
      const nameA = a[sortTerm].toString().toLowerCase();
      const nameB = b[sortTerm].toString().toLowerCase();

      if(sortAsc === true) {
        if (nameA > nameB) {
          return 1;
        }
        if (nameA < nameB) {
          return -1;
        }
        return 0;
      }
      else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
    });
    return sortCol;
  }

}

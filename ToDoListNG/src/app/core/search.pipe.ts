import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(list:any[], search:string): any[] {
    if(search === ""){
      return list;
    }
    search =search.toLowerCase();
    let res:any[] = [];
    for(let l in list){
      if(l.includes(search)){
        res.push(l);
      }
    }
    return res;
  }
}

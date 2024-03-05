import { Injectable } from '@angular/core';
import { User } from '../User/user';
import { AppInitService } from '../app-init.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  get config() {return this.init.config}
  loggedInUser: any = null;

  constructor( private init:AppInitService
  ) { }


  setLoggedInUser(user:User){
    this.loggedInUser = user;
  }
}

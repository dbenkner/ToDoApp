import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginuser } from './DTOs/loginuser';
import { Observable } from 'rxjs';
import { User } from './user';
import { GlobalService } from '../core/global.service';
import { newUserDTO } from './DTOs/newuserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  get url() {return `${this.globalSvc.config.baseurl}/Users`;}
  constructor(private http: HttpClient,
    private globalSvc: GlobalService) { }

    login(login:loginuser): Observable<User>{
      return this.http.post(`${this.url}/loginuser`, login) as Observable<User>;
    }
    registerUser(newUser:newUserDTO): Observable<User>{
      return this.http.post(`${this.url}/registeruser`, newUser) as Observable<User>;
    }
  }

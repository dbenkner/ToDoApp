import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/global.service';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user';
import { newUserDTO } from 'src/app/User/DTOs/newuserDTO';
import { loginuser } from 'src/app/User/DTOs/loginuser';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  loggedInUser:any = null;
  user:User = new User();
  newUser: newUserDTO = new newUserDTO();
  message:string = "";
  constructor(
    private http:HttpClient,
    private userSvc:UserService,
    private globalSvc:GlobalService
  ){}
  createNewUser():void {
    this.userSvc.registerUser(this.newUser).subscribe({
      next:(res) => {
        console.debug(res);
        let loginUser:loginuser = new loginuser();
        this.globalSvc.loggedInUser = res;
        console.debug(this.globalSvc.loggedInUser);
      },
      error:(err) => {
        console.error(err);
        this.message = "Something went wrong";
      }
    });
  }
}

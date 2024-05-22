import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/core/global.service';
import { UserService } from 'src/app/User/user.service';
import { User } from 'src/app/User/user';
import { newUserDTO } from 'src/app/User/DTOs/newuserDTO';
import { loginuser } from 'src/app/User/DTOs/loginuser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validator, Validators, ReactiveFormsModule } from '@angular/forms';

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
    private globalSvc:GlobalService,
    private router: Router
  ){}
  ngOnInit():void {


  }

  createNewUser():void {
    if(this.validateUserEmail(this.newUser.email) === false) {
      this.message = "Enter a valid email address!";
      console.error("Invalid Email");
      return;
    }
    if(!this.validateUserPassword(this.newUser.password)) {
      this.message = "Passowrd must contain 1 lowercase letter, 1 capital letter, 1 number, and 1 special charachter!";
      console.error("Invalid Password");
      return;
    }
    this.userSvc.registerUser(this.newUser).subscribe({
      next:(res) => {
        console.debug(res);
        let loginUser:loginuser = new loginuser();
        this.globalSvc.loggedInUser = res;
        console.debug(this.globalSvc.loggedInUser);
        this.router.navigate(['/listbyuid']);
      },
      error:(err) => {
        console.error(err);
        this.message = "Something went wrong";
      }
    });
  }
  validateUserEmail(email:string):Boolean{
    const re = /([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})$/;
    return re.test(email);
  }
  validateUserPassword(password: string): Boolean {
    const re = /([a-zA-Z0-9`~!@#$%^&*<>()?.,]{8,})$/;
    return re.test(password);
  }
}

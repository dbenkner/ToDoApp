import { Component } from '@angular/core';
import { loginuser } from '../DTOs/loginuser';
import { UserService } from '../user.service';
import { GlobalService } from 'src/app/core/global.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = null;
  loginUser:loginuser = new loginuser();
  message:string = "";
  constructor(private userSvc:UserService,
    private globalSvc:GlobalService,
    private router:Router){}
    logOn() {
      this.userSvc.login(this.loginUser).subscribe({
        next:(res) => {
          this.globalSvc.loggedInUser = res;
          console.debug("User signed in");
          this.router.navigate(['/listbyuid']);
        },
        error:(err) => {
          console.error(err);
          this.message = "Invalid Username or Password";
        }
      })
    }
}

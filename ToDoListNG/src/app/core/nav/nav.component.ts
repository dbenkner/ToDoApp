import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    protected globalSvc:GlobalService,
    private router: Router
  ) {}


  logOut():void {
    this.globalSvc.loggedInUser = null;
    console.debug(this.globalSvc.loggedInUser);
    this.router.navigate(['/login']);
  }
}

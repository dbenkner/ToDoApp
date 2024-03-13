import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { Nav } from './nav';

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
  navItems:Nav[] = [];

  ngOnInit():void {
    this.navItems = [
      new Nav('Home', '/listbyuid'),
      new Nav('About', '/about')
    ];
  }
  setActive(name:string):void {
    this.navItems.find(x => x.name === name)!.isActive = true;
  }
  logOut():void {
    this.globalSvc.loggedInUser = null;
    console.debug(this.globalSvc.loggedInUser);
    this.router.navigate(['/login']);
  }
}

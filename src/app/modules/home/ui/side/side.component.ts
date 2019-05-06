import { MainService } from './../../../../common/services/main.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserGetModel } from 'src/app/common/models/user-get.model';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  isHided = false;

  Pages = {
    'Dashboard': 0,
    'CreateRoute': 1,
    'Places': 2,
    'Routes': 3
  };

  Selected = this.Pages.Dashboard;

  User: UserGetModel = new UserGetModel();

  constructor(private router: Router, private service: MainService ) {
    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
            const currentRoute = this.router.url;
            if (currentRoute.startsWith('/home/dashboard')) {
              this.Selected =  this.Pages.Dashboard;
            }
            if (currentRoute.startsWith('/home/create-route')) {
              this.Selected =  this.Pages.CreateRoute;
            }
            if (currentRoute.startsWith('/home/places')) {
              this.Selected =  this.Pages.Places;
            }
            if (currentRoute.startsWith('/home/routes')) {
              this.Selected =  this.Pages.Routes;
            }
        }
    });
  }

  ngOnInit() {
    this.User = this.service.User;
    this.service.onUserChange$.subscribe(
      (res) => {
        if (res) {
          this.User = this.service.User;
        }
      }
    );
  }

  HideMenu() {
    this.isHided = true;
  }

  OpenMenu() {
    this.isHided = false;
  }

}

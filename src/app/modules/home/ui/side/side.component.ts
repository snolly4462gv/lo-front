import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(private router: Router ) {
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
  }

  HideMenu() {
    this.isHided = true;
  }

  OpenMenu() {
    this.isHided = false;
  }

}

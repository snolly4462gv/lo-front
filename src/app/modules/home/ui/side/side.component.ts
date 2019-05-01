import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  isHided = false;
  Selected = 'Dashboard';
  constructor(private router: Router ) {
    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
            const currentRoute = this.router.url;
            console.log(currentRoute);
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

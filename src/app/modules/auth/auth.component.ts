import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  CurrentPage = 'login';
  constructor(private router: Router) {
    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
            const currentRoute = this.router.url;
            if (currentRoute === '/auth/login') {
              this.CurrentPage = 'login';
            }
            if (currentRoute === '/auth/sign-up') {
              this.CurrentPage = 'sign-up';
            }
        }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var FB: any;
declare var $: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
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

  ngOnInit(): void {
    // this.getFBLoginStatus();
  }

  authGoogle () {
    console.log(`login by google`);
  }
  authVk() {
    console.log(`login by vk`);
// tslint:disable-next-line: max-line-length
    $(location).attr('href',"https://oauth.vk.com/authorize?client_id=6327176&scope=1073737727&redirect_uri=https://irinals.betrip.io/index.html&display=page&response_type=token&revoke=1&state=vk");
  }



  authFB () {
    console.log(`login by fb`);
    this.fbLogin();
  }

  getFBLoginStatus () {
    FB.getLoginStatus((response) => {
        console.log(response);
        if (response['status'] === 'unknown') {
            console.log(`Not Login FB`);
        } else if (response['status'] === 'connected') {
            console.log(`Login FB`, response['authResponse']['accessToken']);
            // facebookLogin(response['authResponse']['accessToken']);
        }
    });
  }

  fbLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
                // facebookLogin(response['authResponse']['accessToken']);
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'email', auth_type: 'reauthenticate' });
  }

  fbLogout() {
    FB.logout(function() {
        console.log(`FB Logout success`);
    });
  }



}

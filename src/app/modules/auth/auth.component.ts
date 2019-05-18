import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

declare var FB: any;
declare var gapi: any;
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
    // this.InitFB();

    // this.handleClientLoad();
  }

  authGoogle () {
    console.log(`login by google`);
  }

  authVk() {
    console.log(`login by vk`);
    // tslint:disable-next-line: max-line-length
    $(location).attr('href', 'https://oauth.vk.com/authorize?client_id=6327176&scope=1073737727&redirect_uri=https://tools.betrip.io/auth/login&display=page&response_type=token&revoke=1&state=vk');
  }

  authFB () {
    console.log(`login by fb`);
    this.fbLogin();
  }


  ////////////////
  ///// FB  /////
  ///////////////

  InitFB() {
    const _this = this;
    window['fbAsyncInit'] = function() {
        FB.init({
            appId      : '349843809000543',
            status     : true,
            cookie     : true,
            xfbml      : true,
            oauth      : true ,
            version    : 'v3.2'
        });
        _this.getFBLoginStatus();
    };

    (function(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return; }
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  getFBLoginStatus () {
    console.log(`CHECK STATUS`);
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


  ////////////////
  /// GOOGLE  ///
  ///////////////

  // GoogleInit () {
     apiKey = 'AIzaSyDY0-Eh_aXzIaR7q-wYWOLaSZcr6VRUMkM';

       discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];

       clientId = '414953430855-irjvuepra9g5imes8ai06c4nqs0tt9cp.apps.googleusercontent.com';

       scopes = 'profile';
  // }

         handleClientLoad() {
        gapi.load('client:auth2', this.initClient);
      }
       initClient() {
          console.log(`INIT`);
        gapi.client.init({
            apiKey: this.apiKey,
            discoveryDocs: this.discoveryDocs,
            clientId: this.clientId,
            scope: this.scopes,
            response_type: 'code',
            redirect_url: 'betrip.io'
        }).then(function () {
            console.log(`After INIT`);
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
         this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          // authorizeButton.onclick = handleAuthClick;
          $('.g-auth').click(function(e){
            this.handleAuthClick();
          });
        });
      }
       updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            console.log(`SignedIn`);
            this.makeApiCall();
        } else {
                 console.log(`NOT SignedIn`);
        }
      }
       handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
         console.log(`Sign In`);
      }
       handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

       makeApiCall() {
          console.log(`API CALL`);
          var access_token = '';
        try{
          access_token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        } catch {
            console.log(`no gapi`);
        }
        if(access_token)
         {} // googleLogin(access_token);
      }


  ////////////////
  /////  VK  /////
  ///////////////



}

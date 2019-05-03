import { MainService } from 'src/app/common/services/main.service';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable()
export class AppGuard implements CanActivate {
    constructor(private service: MainService, private routers: Router) {}

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean{
        const login = this.service.User && this.service.User.token || localStorage.getItem('token') ? true : false;
        switch (router.routeConfig.path) {
            case 'auth': {
              if (login) {
                this.routers.navigate(['/home']);
                return false;
              }
              return true;
            }

            case 'home': {
              if (!login) {
                this.routers.navigate(['/auth']);
                return false;
              }
              return true;
            }

            default: {
                return true;
            }
        }
    }
}

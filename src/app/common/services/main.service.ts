import { UserModel } from './../models/user.model';
import { LoginModel } from './../models/login.model';
import { TypeService } from './type.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject, Observable, Subscribable } from 'rxjs';

import { GUID } from './../models/guide.model';
import { PlaceModel } from '../models/place.model';
import { UserGetModel } from '../models/user-get.model';


@Injectable()
export class MainService {

    public ActiveProcesses: string[] = [];
    public ActiveProcessesChanges: Subject<string[]>;

    public User: UserGetModel = new UserGetModel();
    public onLoginChange$: Subject<boolean>;

    constructor
    (
        private http: HttpService,
        private router: Router,
        private typeService: TypeService
        // public typeService: TypeService
    ) {

        this.onLoginChange$ = new Subject();
        this.onLoginChange$.next(false);

        this.onLoginChange$
            .subscribe(
                (res: boolean) => {
                    if (res) {
                        localStorage.setItem('token', this.User.token);
                        this.http.BaseInitByToken(this.User.token);
                        this.router.navigate(['/home']);
                    } else {
                        this.User = null;
                        localStorage.removeItem('token');
                        this.router.navigate(['/auth']);
                    }
                }
            );
    }


    public LoginUser(user: UserGetModel){
      this.User = user;
      if (this.User.token) {
          this.onLoginChange$.next(true);
      } else {
        this.User = null;
      }
    }

    public LogoutUser(){
      this.onLoginChange$.next(false);
    }


    public WaitBeforeLoading = (fun: () => Observable<any>, success: (result?: any) => void, err?: (obj?: any) => void) => {
        const process = this.GenerateProcessID();
        fun()
            .subscribe(
                res => {
                    success(res);
                    this.DeleteProcess(process);
                },
                error => {

                    this.DeleteProcess(process);
                    if (err && typeof err === 'function') {
                        err(error);
                    }
                }
            );
    }

    private GenerateProcessID() {
        const id: string = GUID.GetNewGUID();
        this.ActiveProcesses.push(id);
        this.ActiveProcessesChanges.next(this.ActiveProcesses);
        return id;
    }

    private DeleteProcess(str: string) {
        const index = this.ActiveProcesses.findIndex(x => x === str);
        if (index !== -1) {
            this.ActiveProcesses.splice(index, 1);
        }
        this.ActiveProcessesChanges.next(this.ActiveProcesses);
    }


    /////////////////////
    /////////////////////
    //                 //
    //     Back-end    //
    //                 //
    /////////////////////
    /////////////////////

    public Login(login: LoginModel) {
      return this.http.PostData('/auth/login', login);
    }
    public CreateUser(user: UserModel) {
      return this.http.PostData('/users', user);
    }
    public CreatePlace(place: PlaceModel) {
      return this.http.PostData('/places', place);
    }
    // this.typeService.ParamsToUrlSearchParams(place)

}

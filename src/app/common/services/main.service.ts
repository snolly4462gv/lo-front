import { RouteModel } from './../models/route.model';
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

    public Places: PlaceModel[] = [];
    public onPlacesChange$: Subject<boolean>;

    public Route: RouteModel = new RouteModel();

    constructor
    (
        private http: HttpService,
        private router: Router,
        private typeService: TypeService
    ) {

        this.onLoginChange$ = new Subject();
        this.onLoginChange$.next(false);

        this.onPlacesChange$ = new Subject();
        this.onPlacesChange$.next(false);

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

    public CheckMe() {
      const token = localStorage.getItem('token');
      if (token) {
        this.http.BaseInitByToken(token);
        this.GetMe()
          .subscribe(
            (res) => {
              this.User = res;
              this.User.token = token;
            },
            (err) => {
              this.onLoginChange$.next(false);
            }
          )
      } else {
         this.onLoginChange$.next(false);
      }
    }


    public LoginUser(user: UserGetModel){
      this.User = user;
      if (this.User.token) {
          this.onLoginChange$.next(true);
      } else {
        this.onLoginChange$.next(false);
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
    //      ROUTE      //
    //                 //
    /////////////////////
    /////////////////////

    public SetPlaces(places: PlaceModel[]) {
      this.Places = places;
      this.onPlacesChange$.next(true);
    }

    public GetPlaces() {
      return this.Places;
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
    public GetMe() {
      return this.http.GetData('/me', '');
    }

    public CreatePlace(place: PlaceModel) {
      return this.http.PostData('/places', place);
    }
    public GetMyPlaces() {
      return this.http.GetData('/me/places', '');
    }
    public GetPlaceById(id) {
      return this.http.GetData('/places/' + id, '');
    }

    // this.typeService.ParamsToUrlSearchParams(place)

}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject, Observable, Subscribable } from 'rxjs';

import { GUID } from './../models/guide.model';


declare var $: any;

@Injectable()
export class MainService {

    public MyLogoChange: Subject<string>;
    public MyUserLogoChange: Subject<string>;

    public ActiveProcesses: string[] = [];
    public ActiveProcessesChanges: Subject<string[]>;

    constructor
    (
        private http: HttpService,
        private router: Router,
        // public typeService: TypeService
    ) {

        // this.CurrentAccountChange = new Subject();
        // this.CurrentAccountChange.next(new AccountGetModel());

        // this.authService.onAuthChange$
        //     .subscribe(
        //         (res: boolean) => {
        //             if (res) {
        //                 this.GetMyUser();
        //                 this.GetMyAccounts();
        //                 if (this.MyAccounts.length > 0) {
        //                     this.settings.GetBackSettings();
        //                 } else {
        //                     this.settings.SaveSettings(this.settings.GetSettings());
        //                 }
        //             } else {
        //                 this.UserChange.next(new UserGetModel());
        //                 this.CurrentAccountChange.next(new AccountGetModel());
        //                 this.MyAccountsChange.next([]);
        //                 this.router.navigate(['/system', 'tickets']);
        //             }
        //         }
        //     );
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

}

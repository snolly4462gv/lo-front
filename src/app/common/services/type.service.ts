import { Injectable } from "@angular/core";
// import { Http, URLSearchParams } from
import { HttpService } from './http.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class TypeService{

    constructor(){ }


    public GetTime()
    {
        let result:string[] = [];
        let time = 0;

        while( time < 12 *60)
        {
            result.push(((time/60) < 10 ? "0":"" + (time /60)) +":"+((time % 60) < 10 ? "0" :"" + (time% 60)));
            time = time + 30;
        }
        return result;
    }

    public ValidateArray(array:any[]) {
        if(array) {
            const result:any[] = [];
            let objValid = true;
            for(const obj of array) {
                if(obj) {
                    for(const key in obj) {
                        if(!obj[key]) {
                            objValid = false;
                        }
                    }

                    if(objValid) {
                        result.push(obj);
                    }

                    objValid = true;
                }
            }
            return result.length > 0 ? result : null;

        }
        return null;
    }

    ParamsToUrlSearchParams(params:any):string {
        const options = new URLSearchParams();

        // tslint:disable-next-line: forin
        for (const key in params) {
            const prop: any = params[key];
            if (prop) {
                if ( prop instanceof Array) {
                    for (const i in prop) {
                        if (prop[i]) {
                            options.append(key + '[]', prop[i]);
                        }
                    }
                } else {
                    options.set(key, params[key]);
                }
            }
        }
        return options.toString();
    }

    StringJSON(params) {
        let options = '';
        options += '{';
// tslint:disable-next-line: forin
        for (const key in params) {
            const prop: any = params[key];
            if (prop) {
                if ( prop instanceof Array) {
                    for (const i in prop) {
                        if (prop[i]) {
                            options += '"' + key + '"' + ':' + '["' + prop[i] + '"]' + ',';
                        }
                    }
                } else {
                    options += '"' + key + '":' + '"' + params[key] + '"' + ',';
                }
            }
        }
        options = options.slice(0, options.length - 1);
        options += '}';
        return options;
    }

    GetDateStringFormat(date: Date) {
        return date.toISOString().split('T')[0];
    }


    GetEndTimeMask(begin: string, finish: string) {
        const mask = [
        /[0-2]/, (finish && (+finish[0]) > 1) ? /[0-3]/ : /\d/, ':', /[0-5]/, /\d/
        ];

        if (begin && begin.length > 0) {
            if (begin[0]) {
                mask[0] = new RegExp('[' + begin[0] + '-2]');
            }

            if (begin[1]) {
                if (finish && finish.length > 0) {
                    if (begin[0] === finish[0]) {
                        mask[1] = new RegExp(
                            (finish && (+finish[0]) > 1) ? '[' + begin[1] + '-3]' : '[' + begin[1] + '-9]'
                        );
                    }
                }
            }

            if (begin[3]) {
                if (finish && finish.length > 3) {
                    if (begin.substr(0, 3) === finish.substr(0, 3)) {
                        mask[3] = new RegExp('[' + begin[3] + '-5]');
                    }
                }
            }

            if (begin[4]) {
                if (finish && finish.length > 4) {
                    if (begin.substr(0, 4) === finish.substr(0, 4)) {
                        if (+begin[4] !== 9) {
                            mask[4] = new RegExp('[' + (+begin[4] + 1 ) + '-9]');
                        } else {
                            mask[4] = new RegExp('[9]');
                        }
                    }
                }
            }
        }

        return mask;
    }

    GetNumbersMask(count: number) {
        const mask = [];
        for (let i = 0; i < count; ++i) {
            mask.push(/\d/);
        }

        return mask;
    }
    GetTextMask(count: number) {
        const mask = [];
        for (let i = 0; i < count; ++i) {
            mask.push(/\d\w\s\n\[\]\^\.\(\)/);
        }

        return mask;
    }

    DateToUTCDateISOString(input) {
        const date = new Date(input);
        return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toISOString();
    }

}



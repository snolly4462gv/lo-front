import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable}  from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TokenModel } from '../models/token.model';

declare var Buffer: any;

@Injectable()
export class HttpService {
    serverUrl = 'https://mouse-back.herokuapp.com';

    public headers: HttpHeaders = new HttpHeaders();
    public token: TokenModel = new TokenModel('');

    constructor(private http: HttpClient) {
        this.BaseHeadersInit();
    }

    BaseInitByToken(data: string) {
        if (data) {
            if (this.headers.has('Authorization')) {
                this.headers.delete('Authorization');
            }
            this.headers.append('Authorization', data);
            this.token = new TokenModel(data);
        }
    }

    BaseHeadersInit() {
        if (!this.headers.has('Content-Type')) {
            this.headers.append('Content-Type', 'application/json');
        }
    }

    GetToken(): TokenModel {
        return this.token;
    }

    validResp(resp) {
        const body = resp._body;
        if (body === ' ') {return false; }
        return true;
    }

    GetData(method: string, params?: string) {
        return this.http.get(this.serverUrl + method + '?' + params, {headers: this.headers});
    }

    DeleteData(method: string) {
        return this.http.delete(this.serverUrl + method, {headers: this.headers});
    }

    PostData(method: string, data: any) {
        return this.http.post(this.serverUrl + method, data, {headers: this.headers});
    }

    PatchData(method: string, data: any) {
        return this.http.patch(this.serverUrl + method, data, {headers: this.headers});
    }

    PutData(method: string, data: string) {
        return this.http.put(this.serverUrl + method, data, {headers: this.headers});
    }

    GetDataFromUrl(url: string) {
        return this.http.get(url, {headers: this.headers});
    }

}
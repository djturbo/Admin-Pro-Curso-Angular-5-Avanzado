import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../util/constants.const';
import { User } from '../../model/user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
    TAG = 'AuthService :: ';
    config: any;
    url: string;
    currentUser: User;
    _menu: any[] = [];

    constructor(
      private _http: HttpClient,
      private _configService: ConfigService
    ) {
      this.config = _configService.getConfig();
      this.url = `${this.config.API.HOST}${this.config.API.CONTEXT.AUTH}`;
      this.getAuthUser();
      console.log(this.TAG, 'config: ', this.config);
    }

    doLogin(credentials: any): Observable<any> {
        const urlLogin = `${this.url}${this.config.API.ENDPOINT.AUTH.LOGIN}`;
        return this._http.post(urlLogin, credentials, {})
        .map(
            (success: any) => {
                let deleteEmail: boolean;
                if (!credentials.rememberme) {
                    deleteEmail = true;
                }
                this.saveOnLocalStorage(success, deleteEmail);
            }
        ).catch(
            err => {
                console.log(this.TAG, 'ERROR status: ', err.status, ' message error: ', err.error.message);
                return Observable.throw(err);
            }
        );
    }

    doLoginWithOAuth(gtoken: any): Observable<any> {
        const urlLogin = `${this.url}${this.config.API.ENDPOINT.AUTH.GOOGLE_SIGN_IN}`;
        return this._http.post(urlLogin, gtoken, {})
        .map(
            (success: any) => {
                this.saveOnLocalStorage(success);
                return success;
            }
        ).catch(error => {
            console.log(this.TAG, 'doLoginWithOAuth error: ', error.message);
            return Observable.throw(error);
        });
    }

    refreshToken(): Observable<any> {
        const urlRefresh = `${this.url}${this.config.API.ENDPOINT.AUTH.REFRESH}`;
        const headers: HttpHeaders = new HttpHeaders().set('Authorization', this.getAuthToken());
        return this._http.post(urlRefresh, {}, {
            headers: headers
        }).map((success: any) => {
            localStorage.setItem(Constants.Security.AUTH_TOKEN, success.token);
            return success.token;
        }).catch(error => {
            console.log(this.TAG, 'refresh token error: ', error.message);
            return Observable.throw(error);
        });
      }
    doLogOut() {
        localStorage.removeItem(Constants.Security.AUTH_TOKEN);
        localStorage.removeItem(Constants.Security.AUTH_USER);
        localStorage.removeItem(Constants.Security.MENU);
    }
    updateAuthUser(user: any) {
        this.currentUser = user;
        localStorage.setItem(Constants.Security.AUTH_USER, JSON.stringify(user));
    }
    saveOnLocalStorage(success: any, hiddenMail?: boolean) {
        const token = success.token;
        const user = success.user;
        this.currentUser = user;
        if (hiddenMail) {
            delete user.email;
        }
        localStorage.setItem(Constants.Security.AUTH_TOKEN, token);
        localStorage.setItem(Constants.Security.AUTH_USER, JSON.stringify(user));
        localStorage.setItem(Constants.Security.MENU, JSON.stringify(success.menu));
    }

    public get menu() {
        return JSON.parse(localStorage.getItem(Constants.Security.MENU));
    }

    getAuthUser(): any {
        const strUser = localStorage.getItem(Constants.Security.AUTH_USER);
        let user = null;
        if (strUser) {
            user = JSON.parse(strUser);
            this.currentUser = user;
        }
        return user;
    }
    getAuthToken(): string {
        return localStorage.getItem(Constants.Security.AUTH_TOKEN);
    }

    isAuthenticated(): boolean {
        const validToken = this.getAuthToken() !== undefined && this.getAuthToken() !== null && this.getAuthUser() !== '';
        console.log(this.TAG, 'isAuthenticated validToken: ', validToken);
        return validToken;
    }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config.service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../util/constants.const';


@Injectable()
export class AuthService {
    TAG = 'AuthService :: ';
    config: any;
    url: string;

    constructor(
      private _http: HttpClient,
      private _configService: ConfigService
    ) {
      this.config = _configService.getConfig();
      this.url = `${this.config.API.HOST}${this.config.API.CONTEXT.AUTH}`;
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
        );
    }

    doLogOut() {
        localStorage.removeItem(Constants.Security.AUTH_TOKEN);
        localStorage.removeItem(Constants.Security.AUTH_USER);
    }

    saveOnLocalStorage(success: any, hiddenMail?: boolean) {
        const token = success.token;
        const user = success.user;
        if(hiddenMail) {
            delete user.email;
        }
        localStorage.setItem(Constants.Security.AUTH_TOKEN, token);
        localStorage.setItem(Constants.Security.AUTH_USER, JSON.stringify(user));
    }
    getAuthUser(): any {
        const strUser = localStorage.getItem(Constants.Security.AUTH_USER);
        let user = null;
        if (strUser) {
            user = JSON.parse(strUser);
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

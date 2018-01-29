import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../model/user.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config.service';
import { Constants } from '../../util/constants.const';

import 'rxjs/add/operator/map';
import swal from 'sweetalert2';


@Injectable()
export class UserService {
  TAG = 'UserService :: ';
  config: any;
  url: string;

  constructor(
    private _http: HttpClient,
    private _configService: ConfigService
  ) {
    this.config = _configService.getConfig();
    this.url = `${this.config.API.HOST}${this.config.API.CONTEXT.USER}`;
    console.log(this.TAG, 'config: ', this.config);
  }

  create(user: User): Observable<any> {
    const urlCreate = `${this.url}${this.config.API.ENDPOINT.USER.CREATE}`;
    return this._http.post(urlCreate, user)
    .map(
      (success: any) => {
        swal('Usuario Creado', success.user.email, 'success');
        return success;
      }
    );
  }
  update(user: User): Observable<any> {
    const urlUpdate = `${this.url}${this.config.API.ENDPOINT.USER.UPDATE}`;
    return this._http.put(urlUpdate, user, {
      headers: new HttpHeaders(this.getAuthToken())
    });
  }
  remove(id: string): Observable<any> {
    const urlRemove = `${this.url}${this.config.API.ENDPOINT.USER.DELETE}`;
    return this._http.delete(urlRemove, {
      headers: new HttpHeaders(this.getAuthToken())
    });
  }
  findAll(): Observable<any> {
    const urlFindAll = `${this.url}${this.config.API.ENDPOINT.USER.FIND_ALL}`;
    return this._http.get(urlFindAll, {
      headers: new HttpHeaders(this.getAuthToken())
    });
  }

  getAuthToken(): string {
    return localStorage.getItem(Constants.Security.AUTH_TOKEN);
  }

}

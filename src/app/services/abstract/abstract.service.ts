import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from '../../model/user.model';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config.service';
import { Constants } from '../../util/constants.const';

import 'rxjs/add/operator/map';
import { AuthService } from '../user/auth.service';
import { FileUploadService } from '../file-upload.service';

export abstract class AbstractService {
    private TAG = 'AbstractService :: ';
    config: any;
    url: string;

    constructor(
      protected _http: HttpClient,
      protected _configService: ConfigService,
      protected _context: string,
      private _authService?: AuthService,
      private _fileUploadService?: FileUploadService
    ) {
      this.config = _configService.getConfig();
      this.url = `${this.config.API.HOST}${_context}`;
      console.log(this.TAG, 'config: ', this.config);
    }

    protected doPost(body: any, endpoint: string): Observable<any> {
        const doPostUrl = `${this.url}${endpoint}`;
        return this._http.post(doPostUrl, body);
    }
    protected doPut(body: any, endpoint: string): Observable<any> {
        const doPutUrl = `${this.url}${endpoint}${body._id}`;
        return this._http.put(doPutUrl, body, {
          headers: new HttpHeaders({'Authorization': this.getAuthToken()})
        }).map(success => {
          this._authService.updateAuthUser(success)
          return success;
        });
      }
      protected doImageUpdate(image: File, collection: string, id: string): Promise<any> {
          return this._fileUploadService.upload(image, collection, id)
          .then(
            success => {
                console.log(this.TAG, 'updateImage SUCCESS, ', success);
                if (collection === 'user') {
                  const user: User = this._authService.getAuthUser();
                  user.image = success.file.name;
                  this._authService.updateAuthUser(user);
                }
                return success;
            }
          );
      }
      protected doRemove(id: string, endpoint: string): Observable<any> {
        const urlRemove = `${this.url}${endpoint}`;
        return this._http.delete(urlRemove, {
          headers: new HttpHeaders({'Authorization': this.getAuthToken()})
        });
      }
      protected doGet(endpoint: string, params?: HttpParams): Observable<any> {
        const urlFindAll = `${this.url}${endpoint}`;
        return this._http.get(urlFindAll, {
          headers: new HttpHeaders({'Authorization': this.getAuthToken()}),
          params
        });
      }

      private getAuthToken(): string {
        return localStorage.getItem(Constants.Security.AUTH_TOKEN);
      }
}

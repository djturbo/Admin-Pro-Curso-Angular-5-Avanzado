import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import { AuthService } from './user/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileUploadService {

  TAG = 'FileUploadService :: ';
  config: any;
  url: string;

  constructor(
    private _http: HttpClient,
    private _configService: ConfigService,
    private _authService: AuthService
  ) {
    this.config = _configService.getConfig();
    this.url = `${this.config.API.HOST}${this.config.API.CONTEXT.UPLOAD}`;
    console.log(this.TAG, 'config: ', this.config);
  }

  upload(file: File, type: string, id: string): Promise<any> {
    const urlUpload = `${this.url}${this.config.API.ENDPOINT.UPLOAD.FILE}${type}/${id}`;

    return new Promise<any>((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);

      xhr.onreadystatechange = () => {
          if ( xhr.readyState === 4) {
              if (xhr.status === 200 ) {
                console.log('Imagen subida');
                resolve(JSON.parse(xhr.response));
              } else {
                console.log('Falló la subida de arvhico');
                reject(xhr.response);
              }
          }
      };
      xhr.open('PUT', urlUpload, true);
      xhr.setRequestHeader('Authorization', this._authService.getAuthToken());
      xhr.send(formData);
    });

  }

}

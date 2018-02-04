import { Injectable } from '@angular/core';
import { AbstractService } from './abstract/abstract.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { Constants } from './../util/constants.const';

import 'rxjs/add/operator/map';
import { AuthService } from './user/auth.service';
import { FileUploadService } from './file-upload.service';

import swal from 'sweetalert2';
import { SearchService } from './search.service';
import { Medico } from '../model/medico.model';
@Injectable()
export class MedicoService extends AbstractService {

  constructor(
    protected _http: HttpClient,
    protected _configService: ConfigService,
    protected _authService: AuthService,
    protected _fileUploadService: FileUploadService,
    protected _searchService: SearchService
  ) {
    /** SUPER CLASS INSTANTIATE */
    super(_http, _configService, _configService.getConfig().API.CONTEXT.MEDICO, _authService, _fileUploadService );
    this.TAG = 'MedicoService :: ';
  }

  create(medico: Medico): Observable<any> {
    return this.doPost(medico, this.config.API.ENDPOINT.MEDICO.CREATE )
    .map(
      (success: any) => {
        swal('Hospital Creado', success.medico.name, 'success');
        return success;
      }
    );
  }

  update(medico: Medico): Observable<any> {
    const endpoint = `${this.config.API.ENDPOINT.MEDICO.UPDATE}`;
    return this.doPut(medico, endpoint)
      .map((success: any) => {
        return success;
    });
  }

  updateImage(image: File, id: string): Promise<any> {
      return this.doImageUpdate(image, 'medico', id)
      .then(
        success => {
            console.log(this.TAG, 'updateImage SUCCESS, ', success);
            return success;
        }
      );
  }

  remove(id: string): Observable<any> {
    const endpoint = `${this.config.API.ENDPOINT.MEDICO.DELETE}`;
    return this.doRemove(id, endpoint);
  }

  findAll(from: string, size: string): Observable<any> {
    const endpoint = `${this.config.API.ENDPOINT.MEDICO.FIND_ALL}`;
    const params = new HttpParams()
      .set('from', from)
      .set('size', size);

    return this.doGet(endpoint,  params);
  }

  findById(id: string): Observable<any> {
    const endpoint = this.config.API.ENDPOINT.MEDICO.FIND_ONE;
    return this.findOne(endpoint, id);
  }

  searchForMedico(tosearch: string): Observable<any> {
    return this._searchService.searchByCollection('medico', tosearch);
  }

}

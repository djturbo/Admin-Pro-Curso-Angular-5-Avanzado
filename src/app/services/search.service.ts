import { Injectable } from '@angular/core';
import { AbstractService } from './abstract/abstract.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService extends AbstractService {

  constructor(
    protected _http: HttpClient,
    protected _configService: ConfigService) {
    super(_http, _configService, _configService.getConfig().API.CONTEXT.SEARCH );
   }

   searchByCollection(collection: string, tosearch: string): Observable<any> {
      const endpoint: string = `${this.config.API.ENDPOINT.SEARCH.FIND_BY_COLLECTION}${collection}`;
      const params: HttpParams = new HttpParams()
            .set('tosearch', tosearch);
      return this.doGet(endpoint, params).map(
        success => {
          return success[collection];
        }
      );
   }

   searchInAll(tosearch: string): Observable<any> {
    const endpoint: string = `${this.config.API.ENDPOINT.SEARCH.FIND_IN_ALL}`;
    return this.doGet(endpoint);
   }
}

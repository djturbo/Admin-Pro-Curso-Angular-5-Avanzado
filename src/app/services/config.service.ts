import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../util/constants.const';


@Injectable()
export class ConfigService {
    TAG = 'ConfigService :: ';
    public _config: any;
    constructor(
        private _http: HttpClient
    ) {
    }

    load(): Observable<any> {
        return this._http.get('config/config.json').map(
            success => {
                console.log(this.TAG, 'Config cargado correctamente: ', success);
                localStorage.setItem(Constants.CONFIG, JSON.stringify(success));
                return success;
            },
            err => {
                console.error('Error al cargar el fichero de configuración. Error: ', err);
            }
        );
    }
    public getConfig(): any {
        console.log(this.TAG, 'obteniendo configuración del localStorage');
        return JSON.parse(localStorage.getItem(Constants.CONFIG));
    }
}

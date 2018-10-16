import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

import { AbstractService } from "./abstract.service";
import { Conversa } from '../models/conversa';

@Injectable()
export class LocalizacaoService extends AbstractService<Conversa> {

    constructor(protected http: Http) {
        super(http);
    }

    public getWebService():string{
        return 'localizacao';
    }

    public buscarCidadeEstado(latitude, longitude): Observable<any>{
        return this.http.get('http://nominatim.openstreetmap.org/reverse?lat=' + latitude + "&lon=" + longitude + "&format=json&json_callback=preencherDados")
            .pipe(map(res => res.json()))
    }
}
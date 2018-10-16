import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

import { AbstractService } from "./abstract.service";
import { Conversa } from '../models/conversa';

@Injectable()
export class ClimaService extends AbstractService<Conversa> {

    public token = '478e0db8451698646eb4a6314b4b9ba3';

    constructor(protected http: Http) {
        super(http);
    }

    public getWebService():string{
        return 'clima';
    }

    public buscarClima(latitude, longitude): Observable<any>{
        return this.http.get('http://nominatim.openstreetmap.org/reverse?lat=' + latitude + "&lon=" + longitude + "&format=json&json_callback=preencherDados")
            .pipe(map(res => res.json()))
    }

    public buscarIdCidade(cidade, estado){
        return this.http.get('http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=' + cidade + '&state=' + estado + '&token=' + this.token)
            .pipe(map(res => res.json()));
    }

    public buscarClimaAtual(id): Observable<any>{
        return this.http.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/' + id + '/current?token=' + this.token)
            .pipe(map(res => res.json()));
    }
}
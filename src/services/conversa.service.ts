import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

import { AbstractService } from "./abstract.service";
import { Conversa } from '../models/conversa';
import { Header } from 'ionic-angular';

@Injectable()
export class ConversaService extends AbstractService<Conversa> {

    constructor(protected http: Http) {
        super(http);
    }

    public getWebService():string{
        return 'conversa';
    }

    public novaConversa(nova, ip):Observable<Conversa>{
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        this.getUrlService(ip);
        return this.http.post(this.urlWebSistema + '/novaconversa/' + 'bemvindo', nova, options).pipe(map(res => res.json()));
    }
}
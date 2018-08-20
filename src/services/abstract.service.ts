import { Injectable } from "../../node_modules/@angular/core";
import { HttpModule, Http } from '@angular/http';

@Injectable()
export abstract class AbstractService<T>{

  protected protocolo: string = 'http';
  public ip: string = 'localhost';
  public porta: string = '8080';
  protected contextSistema: string = '/api/r2d2';
  public urlSistema:string = '';

  constructor(protected http: Http) {
    this.urlSistema = this.protocolo + '://' + this.ip + ':' + this.porta + this.contextSistema;
  }

  public abstract getWebService():string;


}

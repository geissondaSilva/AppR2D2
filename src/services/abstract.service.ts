import { Observable } from 'rxjs/Rx';
import { HttpModule, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

//import { Filtro } from './../models/filtro';

@Injectable()
export abstract class AbstractService<T>{
  
  protected protocolo: string = 'http';
  public ip: string = 'localhost';
  public porta: string = '8080';
  protected contextBase: string = 'BaseWeb/rest/';
  protected contextSistema: string = 'api/r2d2/';
  protected contextAdmin: string = 'AdminWeb/rest/';
  protected urlBase: string = this.protocolo + '://' + this.ip + ':' + this.porta + '/' + this.contextBase;
  protected urlSistema: string = this.protocolo + '://' + this.ip + ':' + this.porta + '/' + this.contextSistema;
  public urlWebBase:string = '';
  public urlDoc = this.protocolo + '://'+ this.ip + ':' + '8082' + '/file/upload';
  protected urlWebSistema:string = '';

  constructor(protected http: Http) {
    this.urlWebBase = this.urlBase + this.getWebService();
    this.urlWebSistema = this.urlSistema + this.getWebService();
  }

  public abstract getWebService():string;

  public findAll(): Observable<Array<T>> {
    return this.http.get(this.urlWebSistema).map(res => {
      return res.json();
    });
  }
 
  public findById(id: number): Observable<T> {
    return this.http.get(this.urlWebBase + "/" + id).map(res => {
      return res.json();
    });
  }

  public buscarid(id: number): Observable<T> {
    return this.http.get(this.urlWebSistema + "/byid/" + id).map(res => {
      return res.json();
    });
  }

  public remove(id: number): Observable<T> {
    return this.http.delete(this.urlWebBase + "/" + id).map(res => {
      return res.json();
    });
  }

  public save(obj: T): Observable<T> {
    console.log(obj);
    return this.http.post(this.urlWebSistema + "/salvar", obj).map(res => {
      return res.json();
    });
  }

  public getConfiguracao(filtro:number):Observable<any> {
    let url = this.urlBase + "filtro/getconfiguracao/"+filtro;
    return this.http.get(url).map(res => {
        return res.json();
    });
  }

  public getConfiguracaoPorTela(idTela:number):Observable<any> {
    let url = this.urlBase + "filtro/getconfiguracaoportela/"+idTela;
    return this.http.get(url).map(res => {
        return res.json();
    });
  }

//   public filter(filter:Filter):Observable<any> {
//     let url = this.urlBase + "filtro/filter/";
//     return this.http.post(url, filter).map(res => {
//         return res.json();
//     });
//   }

}
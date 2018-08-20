import { AbstractService } from "./abstract.service";
import { Conversa } from "../models/conversa";
import { Http, } from "../../node_modules/@angular/http";
import { NovaConversaDto } from "../DTO/nova-conversa-dto";
import { Observable } from 'rxjs/Observable';

export class ConversaService extends AbstractService<Conversa>{

    constructor(http: Http){
        super(http);
    }

    getWebService(){
        return '/conversa';
    }

    public novaConversa(nova:NovaConversaDto):Observable<NovaConversaDto>{
        return //this.http.post(this.urlSistema + '/novaconversa', nova).subscribe
    }

}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversaService } from '../../services/conversa.service';
import { Conversa } from '../../models/conversa';
import { Mensagem } from '../../models/mensagem';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat-page.html',
    providers: [ConversaService]
})

export class ChatPage {

    public conversa:Conversa = new Conversa();
    public mensagens:Mensagem[] = [];

    constructor(public navCtrl: NavController,
    private conversaService:ConversaService) {
        this.novaConversa();
    }

    public novaConversa(){
        let conversa:Conversa = new Conversa();
        conversa.idDispositivo = 1;
        this.conversaService.novaConversa(conversa).subscribe((data) =>{
            this.conversa = data;
            this.conversa.mensagens.forEach(con =>{
                this.mensagens.push(con);
            });
        }, error =>{
            console.log(error);
            alert('deu pau');
        })
    }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversaService } from '../../services/conversa.service';
import { Conversa } from '../../models/conversa';
import { Mensagem } from '../../models/mensagem';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MensagemService } from '../../services/mensagem.service';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat-page.html',
    providers: [ConversaService, MensagemService]
})

export class ChatPage {

    public conversa:Conversa = new Conversa();
    public mensagens:Mensagem[] = [];
    public textoMensagem:string = null;

    constructor(public navCtrl: NavController,
    private conversaService:ConversaService,
    private speechRecognition: SpeechRecognition,
    private mensagemService:MensagemService) {
        this.novaConversa();

        //reconhecimento de voz permissao
        this.speechRecognition.isRecognitionAvailable().then((available: boolean) => console.log(available));

        this.speechRecognition.requestPermission().then(() => console.log('Granted'),() => console.log('Denied'));
    }

    public reconhecer(){
        this.speechRecognition.startListening().subscribe((matches: Array<string>) =>{
            console.log(matches)
            this.enviarMensagem(matches[0]);
        },(onerror) => {
            
        });
    }

    public novaConversa(){
        let conversa:Conversa = new Conversa();
        conversa.idDispositivo = 1;
        this.conversaService.novaConversa(conversa).subscribe((data) =>{
            this.conversa = data;
            this.mensagens = data.mensagens
        }, error =>{
            console.log(error);
            alert('deu pau');
        })
    }

    public enviarMensagem(mens:string){
        let msg:Mensagem = new Mensagem();
        msg.res = mens;
        msg.tipo = 'user';
        this.mensagens.push(msg);
        this.textoMensagem = null;
        this.mensagemService.novaMensagem(msg).subscribe(data =>{
            data.forEach(res =>{
                this.mensagens.push(res);
            })
        }, () =>{
            alert('erro ao mandar mensagem')
        })
    }

}

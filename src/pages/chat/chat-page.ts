import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConversaService } from '../../services/conversa.service';
import { Conversa } from '../../models/conversa';
import { Mensagem } from '../../models/mensagem';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MensagemService } from '../../services/mensagem.service';
import { ActionSheetController } from 'ionic-angular'

@Component({
    selector: 'page-chat',
    templateUrl: 'chat-page.html',
    providers: [ConversaService, MensagemService]
})

export class ChatPage {

    public conversa:Conversa = new Conversa();
    public mensagens:Mensagem[] = [];
    public textoMensagem:string = null;
    public digitando:boolean = false;

    constructor(public navCtrl: NavController,
    private conversaService:ConversaService,
    private speechRecognition: SpeechRecognition,
    private mensagemService:MensagemService,
    public actionCtrl:ActionSheetController) {
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
        this.digitando = true;
        this.conversaService.novaConversa(conversa).subscribe((data) =>{
            this.conversa = data;
            this.mensagens = data.mensagens
            this.digitando = false;
        }, error =>{
            console.log(error);
            this.digitando = false;
            alert('deu pau');
        })
    }

    public enviarMensagem(mens:string){
        if(mens == null){
            return;
        }else if(mens.length < 1){
            return;
        }
        let msg:Mensagem = new Mensagem();
        msg.res = mens;
        msg.tipo = 'user';
        msg.idConversa = this.conversa.id
        this.mensagens.push(msg);
        this.textoMensagem = null;
        let idPergunta = 0;

        if(this.mensagens.length < 1){
            idPergunta = 0;
        }else{
            let p = this.mensagens[this.mensagens.length - 2].res
            p = p[p.length - 1];
            if(p == '?'){
                idPergunta = 1;
            }
        }
        this.digitando = true;
        this.mensagemService.novaMensagem(msg, idPergunta).subscribe(data =>{
            this.digitando = false;
            data.forEach(res =>{
                this.mensagens.push(res);
            })
            this.scrollRefresh();
        }, () =>{
            this.digitando = false;
            alert('erro ao mandar mensagem')
        })
    }

    public scrollRefresh(){
        var doc = document.getElementById('content');
        doc.scrollTop = doc.scrollHeight;
    }

    public abrirOpcoes(){
        this.actionCtrl.create({
            title: 'Opções',
            buttons: [
                {
                    text: 'Excluir conversa',
                    icon: 'trash'
                },
                {
                    text: 'Nova conversa',
                    icon: 'chatboxes'
                },
                {
                    text: 'Cancelar',
                    icon: 'close'
                }
            ]
        }).present();
    }

}

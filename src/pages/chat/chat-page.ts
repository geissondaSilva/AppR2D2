import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ConversaService } from '../../services/conversa.service';
import { Conversa } from '../../models/conversa';
import { Mensagem } from '../../models/mensagem';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MensagemService } from '../../services/mensagem.service';
import { ActionSheetController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Comandos } from '../../assets/scripts/comandos';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalizacaoService } from '../../services/localizacao.service';
import { ClimaService } from '../../services/clima.service';
import { DatePipe } from '@angular/common';
import { Util } from './../util';

@Component({
    selector: 'page-chat',
    templateUrl: 'chat-page.html',
    providers: [ConversaService, MensagemService, LocalizacaoService, ClimaService]
})

export class ChatPage {

    public conversa:Conversa = new Conversa();
    public mensagens:Mensagem[] = [];
    public textoMensagem:string = null;
    public digitando:boolean = false;
    public comando:Comandos = new Comandos();
    public util: Util = new Util();
    private pipeDate: DatePipe;

    constructor(public navCtrl: NavController,
    private conversaService:ConversaService,
    private speechRecognition: SpeechRecognition,
    private mensagemService:MensagemService,
    public actionCtrl:ActionSheetController,
    private alertCtrl:AlertController,
    private bluetooth:BluetoothSerial,
    private geolocation: Geolocation,
    private localizacao: LocalizacaoService,
    private clima: ClimaService) {
        this.novaConversa();
        this.exibirClima();
        //reconhecimento de voz permissao
        this.speechRecognition.isRecognitionAvailable().then((available: boolean) => console.log(available));

        this.bluetooth.available();

        this.speechRecognition.requestPermission().then(() => console.log('Granted'),() => console.log('Denied'));
         this.initializeApp();
    }

    public reconhecer(){
        this.speechRecognition.startListening().subscribe((matches: Array<string>) =>{
            console.log(matches)
            this.enviarMensagem(matches[0]);
        },(onerror) => {
            
        });
    }

    public initializeApp(){
        this.alertCtrl.create({
            title: "Concetar-se via Bluetooth",
            message: 'Deseja se conectar via Bluetooth com o R2D2',
            buttons:[
                {
                    text: 'Não',
                    role: 'cancel'
                },
                {
                    text: 'Sim',
                    handler: () =>{
                        this.conectar();
                    }
                }
            ]
        }).present();
    }

    public conectar(){
        this.bluetooth.isConnected().then(con =>{
            console.log(con);
        }).catch(() =>{
            this.alertCtrl.create({
                title: 'Atenção!',
                message: 'Você precisa ativar a conexão bluetooth!',
                buttons: [
                    {
                        text: 'Ok',
                        handler: () =>{
                            this.bluetooth.showBluetoothSettings().then((d) =>{
                                this.bluetooth.isConnected().then(() =>{
                                    this.bluetooth.list().then(data =>{
                                        console.log('lista de dispositivos', data);
                                    })
                                })
                            })
                        }
                    }
                ]
            }).present();
        })
    }

    public novaConversa(){
        this.conversa = null;
        this.mensagens = [];
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
        msg.obj = undefined;
        this.mensagens.push(msg);
        this.textoMensagem = null;
        let idPergunta = 0;

        if(this.mensagens.length < 1){
            idPergunta = 0;
        }else{
            for(let i = this.mensagens.length - 1; i >= 0;i--){
                let m = this.mensagens[i];
                if(m.name == 'novodialogo' || m.name == 'filha'){
                    let p = m.res;
                    p = p[p.length - 1];
                    if(p == '?'){
                        idPergunta = 1;
                        msg.idDialogo = m.idDialogo;
                    }
                    break;
                }

                if(m.name == 'subresposta' || m.tipo == 'acao' || m.tipo == 'resposta'){
                    break;
                }
            }
        }

        this.digitando = true;
        this.mensagemService.novaMensagem(msg, idPergunta).subscribe(data =>{
            this.digitando = false;
            data.forEach(res =>{
                setTimeout(() => {
                    if(res.tipo == 'acao'){
                        let msg: Mensagem = this.funcionalidades(res.name, res);
                        if(msg = null){
                            this.mandarComando(res.name);
                        }else{
                            this.mensagens.push(msg);
                        }
                    }else{
                        this.mensagens.push(res);
                    }
                }, 200);
            })
            this.scrollRefresh();
        }, () =>{
            this.digitando = false;
            alert('erro ao mandar mensagem')
        })
    }

    public scrollRefresh(){
        var doc = document.getElementsByClassName("scroll-content");
        let u = doc.length - 1;
        doc[u].scrollTop = doc[u].scrollHeight;
    }

    public atualizarScroolFoco(){
        setTimeout(() => {
            this.scrollRefresh();
        }, 500);
    }

    public abrirOpcoes(){
        this.actionCtrl.create({
            title: 'Opções',
            buttons: [
                {
                    text: 'Conectar-se ao R2D2',
                    icon: 'bluetooth',
                    
                },
                {
                    text: 'Nova conversa',
                    icon: 'chatboxes',
                    handler: () =>{
                        this.novaConversa();
                    }
                },
                {
                    text: 'Cancelar',
                    icon: 'close'
                }
            ]
        }).present();
    }

    public mandarComando(comando:string){
        this.bluetooth.isConnected().then(data =>{
            comando = this.comando.getComando(comando);
            this.bluetooth.write(comando);
        }).catch(error =>{
            console.log('error')
        })
    }

    public funcionalidades(action: string, msg:Mensagem){
        switch (action) {
            case 'hora':
                let date = this.pipeDate.transform(new Date(), 'HH:mm')
                msg.res = 'Agora são ' + date;
                break;
            case 'data':
                let data = new Date();
                let dia = data.getDate();
                let mes = this.util.buscarMes(data.getMonth());
                let semana = this.util.buscarSemana(data.getDay());
                msg.res = 'Hoje é ' + semana + ' dia ' + dia + ' de ' + mes + ' de  ' + data.getFullYear();
                break;
            case 'clima':
                this.exibirClima();
                break;
            default:
                return null;
        }
        return msg;
    }

    public exibirHora(){

    }

    public exibirData(){

    }

    public exibirClima(){
        //buscar a localizacao
        this.geolocation.getCurrentPosition().then(position =>{
            console.log('position', position);
            //buscar cidade e estado
            this.clima.buscarIdCidade('Pato Branco', 'PR').subscribe(res =>{
                console.log('idcidade',res)
                this.clima.buscarClimaAtual(res[0].id).subscribe(clima =>{
                    console.log('clima', clima);
                })
            })
        })
    }
}

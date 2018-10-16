import { Component } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { AlertController } from "ionic-angular";
import { NavigationBar } from "@ionic-native/navigation-bar";
import { Comandos } from "../../assets/scripts/comandos";

@Component({
    selector: 'drive-page',
    templateUrl: './drive-page.html'
})

export class DrivePage{

    public comandos:Comandos = new Comandos();
    public ativo:boolean = false;
    
    constructor(private statusBar:StatusBar, private bluetoothSerial:BluetoothSerial,
    private alert:AlertController, private navigationBar:NavigationBar){
        this.statusBar.overlaysWebView(true);
    }

    ionViewDidLeave(){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#2979ff');
    }

    public inicializarBluetooth(){
        this.bluetoothSerial.isEnabled().then(data =>{
            console.log(data);
            this.conectar();
        }).catch(() =>{
            
        })
    }

    public ativarBluetooth(){
        this.alert.create({
            title: 'Bluetooth desligado',
            message: 'Deseja ativar ser bluetooth para conectar-se ao R2D2?',
            buttons:[
                {
                    text: 'Não',
                    handler: () =>{
                        console.log('nao');
                    }
                },
                {
                    text: 'Sim',
                    handler: () =>{
                        this.bluetoothSerial.enable().then(data =>{
                            this.conectar();
                        }).catch(error =>{
                            this.alert.create({
                                title: 'Ops, deu pau!',
                                message: 'Ocorreu um erro ao ativar o bluetooth.',
                                buttons: [
                                    {
                                        text: 'Ok'
                                    }
                                ]
                            }).present();
                        });
                    }
                }
            ]
        }).present();
    }

    public conectar(){
        this.bluetoothSerial.connect('00:21:13:04:5F:2F').subscribe(data =>{
            alert(data);
            this.ativo = true;
        }, (err) =>{
            alert(err);
        })
    }

    public acenderLed(){
        if(!this.ativo)return;
        let a = this.comandos.getComando('acenderled');
        this.bluetoothSerial.write(a);
    }

    public run(a:string){
        if(!this.ativo)return;
        this.bluetoothSerial.write(a).then(data =>{
            alert(data)
        }, err =>{
            alert(err)
        })
    }

}
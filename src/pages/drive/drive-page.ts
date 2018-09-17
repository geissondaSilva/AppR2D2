import { Component } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { AlertController } from "ionic-angular";
import { NavigationBar } from "@ionic-native/navigation-bar";

@Component({
    selector: 'drive-page',
    templateUrl: './drive-page.html'
})

export class DrivePage{
    
    constructor(private statusBar:StatusBar, private bluetoothSerial:BluetoothSerial,
    private alert:AlertController, private navigationBar:NavigationBar){
        this.statusBar.overlaysWebView(true);
        this.navigationBar.hideNavigationBar();
        this.navigationBar.setUp(false);
    }

    ionViewDidLeave(){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#2979ff');
        this.navigationBar.hideNavigationBar();
        this.navigationBar.setUp(true);
    }

    public inicializarBluetooth(){
        this.bluetoothSerial.isEnabled().then(data =>{
            console.log(data);
            this.buscarDispositivos();
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
                            this.buscarDispositivos();
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

    public buscarDispositivos(){
        this.bluetoothSerial.discoverUnpaired().then(data =>{
            console.log('buscando devices', data)
        }).then(err =>{
            console.log('error aao encontrar devices', err)
        })
    }

}
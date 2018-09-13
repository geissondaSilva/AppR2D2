import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatPage } from '../chat/chat-page';
import { DrivePage } from '../drive/drive-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewCanLeave(){
    
  }

  public abrirChat(){
    this.navCtrl.push(ChatPage);
  }

  public abrirDrive(){
    this.navCtrl.push(DrivePage);
  }

}

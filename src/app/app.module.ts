import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChatPage } from '../pages/chat/chat-page';
import { HttpModule } from '@angular/http';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { DrivePage } from '../pages/drive/drive-page';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { NavigationBar } from '@ionic-native/navigation-bar';
import { SobrePage } from '../pages/sobre/sobre-page';
import { PersonagensPage } from '../pages/personagens/pesonagens-page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    DrivePage,
    SobrePage,
    PersonagensPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    DrivePage,
    SobrePage,
    PersonagensPage
  ],
  providers: [
    StatusBar,
    SpeechRecognition,
    SplashScreen,
    BluetoothSerial,
    NavigationBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

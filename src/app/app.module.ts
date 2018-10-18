import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { NavigationBar } from '@ionic-native/navigation-bar';

import { ListPage } from '../pages/list/list';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat-page';
import { DrivePage } from '../pages/drive/drive-page';
import { SobrePage } from '../pages/sobre/sobre-page';
import { PersonagensPage } from '../pages/personagens/pesonagens-page';
import { ClimaComponente } from '../components/clima-componente/clima.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    DrivePage,
    SobrePage,
    PersonagensPage,
    ClimaComponente,
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
    PersonagensPage,
    ClimaComponente
  ],
  providers: [
    StatusBar,
    SpeechRecognition,
    Geolocation,
    SplashScreen,
    BluetoothSerial,
    NavigationBar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class AppModule {}

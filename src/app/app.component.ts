import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SobrePage } from '../pages/sobre/sobre-page';
import { PersonagensPage } from '../pages/personagens/pesonagens-page';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    @ViewChild('menu') menu:MenuController;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'List', component: ListPage }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.backgroundColorByHexString('#2979ff');
            this.splashScreen.hide();
        });
    }

    openHome(){
        this.nav.setRoot(HomePage);
        this.menu.toggle();
    }

    openSobre(){
        this.nav.push(SobrePage);
        this.menu.toggle();
    }

    openPersonagens(){
        this.nav.push(PersonagensPage);
        this.menu.toggle();
    }
}

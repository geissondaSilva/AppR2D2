import { Component } from "@angular/core";
import { StatusBar } from "@ionic-native/status-bar";

@Component({
    selector: 'drive-page',
    templateUrl: './drive-page.html'
})

export class DrivePage{
    
    constructor(private statusBar:StatusBar){
        this.statusBar.overlaysWebView(true);
    }

    ionViewDidLeave(){
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#2979ff');
    }

}
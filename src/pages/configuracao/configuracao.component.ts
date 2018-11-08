import { Component, OnInit } from "@angular/core";
import { AppPreferences } from "@ionic-native/app-preferences";

@Component({
    selector: 'configuracao-page',
    templateUrl: 'configuracao.html'
})

export class ConfiguracaoComponent implements OnInit {
    
    public url: string;

    constructor(private preferences: AppPreferences) { }

    ngOnInit() {
        this.preferences.fetch('', 'url').then(url => {
            this.url = url;
        })
    }

    public salvar(){
        this.preferences.store('', 'url', this.url );
    }
}
import { Component, Input } from '@angular/core';

@Component({
    selector: 'clima-componente',
    templateUrl: './clima.component.html',
})

export class ClimaComponente {
    
    @Input() clima: any;

    constructor(){

    }
}
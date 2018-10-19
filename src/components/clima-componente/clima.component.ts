import { Component, Input } from '@angular/core';
import { Mensagem } from '../../models/mensagem';
import { LocalizacaoService } from '../../services/localizacao.service';
import { ClimaService } from '../../services/clima.service';
import { ClimaData } from '../../models/clima-data';
import { Clima } from '../../models/clima';

@Component({
    selector: 'clima-componente',
    templateUrl: './clima.component.html',
    providers: [ClimaService, LocalizacaoService]
})

export class ClimaComponente {
    
    @Input() mensagem: Mensagem;

    public carregando: boolean = true;
    public error: boolean = false;
    public clima: Clima = new Clima();

    constructor(private localizacaoService: LocalizacaoService,
    private climaService: ClimaService){
        console.log('mensagem recebida', this.mensagem);
        this.buscarClima();
    }

    public buscarClima(){
        this.climaService.buscarIdCidade('Pato Branco', 'PR').subscribe(data =>{
            this.climaService.buscarClimaAtual(data[0].id).subscribe(clima =>{
                this.clima = clima;
                console.log('clima', clima)
            }, () => {
                this.error = true;
                this.carregando = false;    
            })
        }, () => {
            this.error = true;
            this.carregando = false;
        })
    }
}
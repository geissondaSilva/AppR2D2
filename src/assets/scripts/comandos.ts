export class Comandos{
    private comandos = {
        "breaking": "0",
        "runfront": 'a',
        "runback": 'b',
        "runleft": 'c',
        "runright": 'd',
        "negar": 'e',
        "afirmar": 'f',
        "balancar": 'g',
        "viraresquerda": 'H',
        "virardireita": 'i',
        "dancar": 'j'
    }

    public getComando(value:string){
        if(this.comandos[value]){
            return this.comandos[value];
        }
        return null;
    }
}
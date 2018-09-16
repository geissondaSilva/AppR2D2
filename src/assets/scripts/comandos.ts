export class Comandos{
    private comandos = {
        "stop": "0",
        "runfront": '1',
        "runback": '2'
    }

    public getComando(value:string){
        if(this.comandos[value]){
            return this.comandos[value];
        }
        return null;
    }
}
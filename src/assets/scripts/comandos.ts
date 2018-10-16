export class Comandos{
    private comandos = {
        "breaking": "0",
        "runfront": '1',
        "runback": '2',
        "runright": '3',
        "runleft": '4',
        "stoping": '5',
        "seeleft": '6',
        "seeright": '7',
        "nop": '8',
        "acenderled": '9'
    }

    public getComando(value:string){
        if(this.comandos[value]){
            return this.comandos[value];
        }
        return null;
    }
}
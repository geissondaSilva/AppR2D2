export class Comandos{
    private comandos = {
        "stop": "0",
        "runfront": '1',
        "runleft": '2',
        "runback": '3',
        "runright": '4',
        "front": '5',
        "back": '6',
        "right": '7',
        "left": '8',
        "girardir": '9',
        "giraresq": 'a',
        "led": 'b',
        "setar": 'c'
    }

    public getComando(value:string){
        if(this.comandos[value]){
            return this.comandos[value];
        }
        return null;
    }
}
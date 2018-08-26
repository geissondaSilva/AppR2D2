import { Mensagem } from "./mensagem";

export class Conversa{
    public id:number;
    public dataConversa:Date;
    public idDispositivo:number;
    public mensagens:Mensagem[] = []
}
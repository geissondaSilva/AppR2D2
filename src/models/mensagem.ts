import { Resposta } from "./resposta";

export class Mensagem{
    public id:number;
    public idConversa:number;
    public idResposta:number;
    public res:string;
    public tipo:string;
    public resposta:Resposta;
    public name:string;
    public idDialogo:number;
    public obj:any;
}
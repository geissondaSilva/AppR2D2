import { Pergunta } from "./pergunta";

export class Resposta{
    public id:number;
    public idPergunta:number;
    public pergunta:Pergunta;
    public value:string;
    public sequence:number;
    public idAcoes:number;
}
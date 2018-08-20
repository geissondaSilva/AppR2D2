import { Conversa } from "../models/conversa";
import { Mensagem } from "../models/mensagem";

export class NovaConversaDto{
    
    public conversa:Conversa;
    public mensagens:Array<Mensagem> = [];
}
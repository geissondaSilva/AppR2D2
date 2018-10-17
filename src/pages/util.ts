export class Util{

    public buscarMes(i:number): string {
        let a:string = '';
        switch(i){
            case 0: a = 'Jan';break;
            case 1: a = 'Fev';break;
            case 2: a = 'Mar';break;
            case 3: a = 'Abr';break;
            case 4: a = 'Mai';break;
            case 5: a = 'Jun';break;
            case 6: a = 'Jul';break;
            case 7: a = 'Ago';break;
            case 8: a = 'Set';break;
            case 9: a = 'Out';break;
            case 10: a = 'Nov';break;
            case 11: a = 'Dez';break;
        }
        return a;
    }

    public buscarSemana(i: number): string {
        let a:string = '';
        switch(i){
            case 0: a = 'Dom';break;
            case 1: a = 'Seg';break;
            case 2: a = 'Ter';break;
            case 3: a = 'Qua';break;
            case 4: a = 'Qui';break;
            case 5: a = 'Sex';break;
            case 6: a = 'Sab';break;
        }
        return a;
    }
}
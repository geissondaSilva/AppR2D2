import { ClimaData } from "./clima-data";

export class Clima{

    public country: string;
    public data: ClimaData = new ClimaData();
    public id: number;
    public name: string;
    public state: string;
}
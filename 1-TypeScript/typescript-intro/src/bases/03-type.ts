import axios from 'axios';
import { Move, PokeapiResponse } from '../interface/pokeapi-response.interface';

export class Pokemen{
    
    constructor(
        public readonly id: number, 
        public name: string,
    ){};

    get imageUrl(): string {
        return `https://pokemons/${this.id}.jpg`;
    };

    public scream(){
        console.log(`${this.name.toUpperCase()} !!!`);
        this.speak();
    };

    private speak(){
        console.log(`${this.name}, ${this.name}`);
    };

    public async getMove():Promise<Move[]>{
        const { data } = await axios.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        console.log(data.moves);
        return data.moves;    
    }

};

export const charmander = new Pokemen(123, "Charmander");

charmander.getMove();
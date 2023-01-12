import { Injectable, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto , UpdateCarDto} from './dto/index';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
          id: uuid(),
          brand: "Toyota",
          model: "Corolla" 
        },
        {
            id: uuid(),
            brand: "Honda",
            model: "Civic" 
        },
        {
            id: uuid(),
            brand: "Jeep",
            model: "Cherpkee" 
        }
    ];

    findAll(){
        return this.cars;
    };

    findOneById(@Param('id', ParseUUIDPipe ) id: string){
        const cars = this.cars.find(car => car.id === id);
        if(!cars) throw new NotFoundException(`Car with  id ${id} not found`);
        return cars;
    };

    create( createCarDto: CreateCarDto ){

        const newCar: Car = {
            id: uuid(),
            ...createCarDto
        };

        this.cars.push(newCar);

        return newCar;

    };

    update( id: string, updateCarDto: UpdateCarDto){

        let carDB = this.findOneById( id );

        this.cars = this.cars.map( car => {
            if( car.id === id ){
                carDB = { ...carDB, ...updateCarDto, id }
                return carDB
            }

            return car;

        })

        return carDB; // carro actualizado
    };

    delete( id: string  ){
        const carDB = this.findOneById( id );
        this.cars = this.cars.filter( car =>  car.id !== id    )
    };

    fillCarsWithSeedData( cars: Car[]){
        this.cars = cars;
    };

}

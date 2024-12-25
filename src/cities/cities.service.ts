import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
    constructor(@InjectRepository(City) private citiesRepository: Repository<City>) {}

    async findAll(): Promise<City[]> {
        return await this.citiesRepository.find();
    }

    async insertCity(createCityDto: CreateCityDto): Promise<City> {
        let city = this.citiesRepository.create(createCityDto);
        return await this.citiesRepository.save(city);
    }

    async findCityByName(name: string): Promise<City> {
        return await this.citiesRepository.findOne({where: {name: name}});
    }

    async updateCity(name: string, updateCityDto: UpdateCityDto): Promise<City> {
        let city = await this.citiesRepository.findOne({ where: { name: name } });
        if (!city) {
            throw new NotFoundException(`City ${name} not found`);
        }
        city = this.citiesRepository.create(updateCityDto);
        return await this.citiesRepository.save(city);
    }

    async deleteCity(id: string): Promise<City> {
        let city = await this.citiesRepository.findOne({ where: { id: id } });
        if (!city) {
            throw new NotFoundException(`City ${id} not found`);
        }
        return await this.citiesRepository.remove(city);
    }
}

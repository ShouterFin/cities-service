import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { CitiesService } from 'src/cities/cities.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Repository } from 'typeorm';
import { UdpateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
    constructor(@InjectRepository(Location) private locationRepository: Repository<Location>,
    private citiesService: CitiesService) {}

    async findAll(): Promise<Location[]> {
        return await this.locationRepository.find();
    }

    async findLocationsByCity(cityName: string): Promise<Location[]> {
        const city = await this.citiesService.findCityByName(cityName);
        if (!city) {
            throw new NotFoundException(`City ${cityName} not found`);
        }
        return await this.locationRepository.find({where: {city: city}});
    }

    async insertLocation(cityName: string, createLocationDto: CreateLocationDto): Promise<Location> {
        const city = await this.citiesService.findCityByName(cityName);
        if (!city) {
            throw new NotFoundException(`City ${cityName} not found`);
        }
        let location = this.locationRepository.create(createLocationDto);
        location.city = city;
        return await this.locationRepository.save(location);
    }

    async updateLocation(name: string, updatelocationDto: UdpateLocationDto): Promise<Location> {
        let location = await this.locationRepository.findOne({where: {name: name}});
        if (!location) {
            throw new NotFoundException(`Location ${name} not found`);
        }
        location = this.locationRepository.create(updatelocationDto);
        return await this.locationRepository.save(location);
    }

    async deleteLocation(id: string): Promise<Location> {
        let location = await this.locationRepository.findOne({where: {id: id}});
        if (!location) {
            throw new NotFoundException(`Location ${id} not found`);
        }
        return await this.locationRepository.remove(location);
    }
}

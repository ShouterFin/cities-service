import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CityModel } from './models/city.model';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Resolver((of) => CityModel)
export class CitiesResolver {
    constructor(private readonly citiesService: CitiesService) {}

    @Query(() => [CityModel])
    async getCities(): Promise<CityModel[]> {
        let cities = await this.citiesService.findAll();
        return cities as CityModel[];
    }

    @Mutation(() => CityModel)
    async createCity(@Args('createCityInput') createCityDto: CreateCityDto): Promise<CityModel> {
        return await this.citiesService.insertCity(createCityDto) as CityModel;
    }

    @Mutation(() => CityModel)
    async updateCity(@Args('name') name: string, @Args('updateCityInput') updateCityDto: UpdateCityDto): Promise<CityModel> {
        return await this.citiesService.updateCity(name, updateCityDto) as CityModel;
    }

    @Mutation(() => CityModel)
    async deleteCity(@Args('id') id: string): Promise<CityModel> {
        const city = await this.citiesService.deleteCity(id);
        return city as CityModel;
    }
}

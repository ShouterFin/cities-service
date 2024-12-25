import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LocationModel } from './models/location.model';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Resolver((of) => LocationModel)
export class LocationsResolver {
    constructor(private readonly locationsService: LocationsService) {}

    @Query(() => [LocationModel])
    async getLocations(): Promise<LocationModel[]> {
        let locations = await this.locationsService.findAll();
        return locations as unknown as LocationModel[];
    }

    @Query(() => [LocationModel])
    async getLocationsByCity(@Args('city') city: string): Promise<LocationModel[]> {
        let locations = await this.locationsService.findLocationsByCity(city);
        return locations as unknown as LocationModel[];
    }

    @Mutation(() => LocationModel)
    async createLocation(
        @Args('city') city: string,
        @Args('createLocationInput') createLocationDto: CreateLocationDto): Promise<LocationModel> {
        return await this.locationsService.insertLocation(city, createLocationDto) as unknown as LocationModel;
    }

    @Mutation(() => LocationModel)
    async updateLocation(
        @Args('name') name: string,
        @Args('updateLocationInput') updateLocationDto: CreateLocationDto): Promise<LocationModel> {
        return await this.locationsService.updateLocation(name, updateLocationDto) as unknown as LocationModel;
    }

    @Mutation (() => LocationModel)
    async deleteLocation(@Args('id') id: string): Promise<LocationModel> {
        const location = await this.locationsService.deleteLocation(id);
        return location as unknown as LocationModel;
    }
}

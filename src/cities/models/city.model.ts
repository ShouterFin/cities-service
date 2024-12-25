import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CityModel {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    country_code: string;
}
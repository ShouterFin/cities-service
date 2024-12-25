import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateLocationDto {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    street_address: string;
}

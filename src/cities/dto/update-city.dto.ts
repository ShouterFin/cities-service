import { InputType } from "@nestjs/graphql";
import { CreateCityDto } from "./create-city.dto";

@InputType()
export class UpdateCityDto extends CreateCityDto {
}

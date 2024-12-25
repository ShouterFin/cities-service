import { InputType } from "@nestjs/graphql";
import { CreateLocationDto } from "./create-location.dto";

@InputType()
export class UdpateLocationDto extends CreateLocationDto {
}

import { ApiProperty } from "@nestjs/swagger";

export class DTOClient {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

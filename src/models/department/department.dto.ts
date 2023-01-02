import { ApiProperty } from "@nestjs/swagger";

export class DTODepartment {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
}

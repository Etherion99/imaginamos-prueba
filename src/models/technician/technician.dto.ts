import { ApiProperty } from "@nestjs/swagger";

export class DTOTechnician {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  admissionDate: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { DTODepartment } from '../department/department.dto';

export class DTOMunicipality {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: DTODepartment })
  department: DTODepartment;
}

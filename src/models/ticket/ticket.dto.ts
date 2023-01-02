import { ApiProperty } from '@nestjs/swagger';
import { DTOClient } from '../client/client.dto';
import { DTOMunicipality } from '../municipality/municipality.dto';
import { DTOTechnician } from '../technician/technician.dto';

export class DTOTicket {
  @ApiProperty()
  id?: string;

  @ApiProperty({ type: DTOClient })
  client: DTOClient;

  @ApiProperty({ type: DTOTechnician })
  technician?: DTOTechnician;

  @ApiProperty({ type: DTOMunicipality })
  municipality: DTOMunicipality;

  @ApiProperty()
  address: string;

  @ApiProperty()
  payment: number;

  @ApiProperty()
  comments: string;

  @ApiProperty()
  serviceDate: Date;

  @ApiProperty()
  done: boolean;
}

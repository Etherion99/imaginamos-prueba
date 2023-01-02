import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { IHttpResponse } from '../../interfaces/http-response.interface';
import { DTOTechnician } from '../../models/technician/technician.dto';
import { TechniciansService } from './technicians.service';
@ApiTags('Modulo Técnicos')
@Controller('Technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.techniciansService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'Identificador utilizado para encontrar al técnico',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IHttpResponse> {
    return this.techniciansService.findOne(id);
  }

  @ApiBody({
    description: 'Modelo para creación de técnicos',
    type: DTOTechnician,
  })
  @Post()
  create(@Body() technicianDTO: DTOTechnician): Promise<IHttpResponse> {
    return this.techniciansService.create(technicianDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al técnico y actualiarlo',
  })
  @ApiBody({
    description: 'Modelo para actualización de técnicos',
    type: DTOTechnician,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() technicianDTO: DTOTechnician,
  ): Promise<IHttpResponse> {
    return this.techniciansService.update(id, technicianDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al técnico y eliminarlo',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<IHttpResponse> {
    return this.techniciansService.delete(id);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al técnico y retornar sus tiquetes',
  })
  @Get('/tickets/:id')
  getTickets(@Param('id') id: string): Promise<IHttpResponse> {
    return this.techniciansService.getTickets(id);
  }
}

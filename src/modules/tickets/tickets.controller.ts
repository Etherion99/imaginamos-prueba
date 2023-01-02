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
import { DTOTicket } from '../../models/ticket/ticket.dto';
import { TicketsService } from './tickets.service';

@ApiTags('Modulo Tiquetes')
@Controller('Tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.ticketsService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'Identificador utilizado para encontrar al tiquete',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IHttpResponse> {
    return this.ticketsService.findOne(id);
  }

  @ApiBody({ description: 'Modelo para creación de tiquetes', type: DTOTicket })
  @Post()
  create(@Body() ticketDTO: DTOTicket): Promise<IHttpResponse> {
    return this.ticketsService.create(ticketDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al tiquete y actualiarlo',
  })
  @ApiBody({
    description: 'Modelo para actualización de tiquetes',
    type: DTOTicket,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() ticketDTO: DTOTicket,
  ): Promise<IHttpResponse> {
    return this.ticketsService.update(id, ticketDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al tiquete y eliminarlo',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<IHttpResponse> {
    return this.ticketsService.delete(id);
  }
}

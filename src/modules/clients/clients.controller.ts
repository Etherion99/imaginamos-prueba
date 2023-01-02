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
import { DTOClient } from '../../models/client/client.dto';
import { ClientsService } from './clients.service';

@ApiTags('Modulo Clientes')
@Controller('Clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.clientsService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'Identificador utilizado para encontrar al cliente',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IHttpResponse> {
    return this.clientsService.findOne(id);
  }

  @ApiBody({ description: 'Modelo para creación de clientes', type: DTOClient })
  @Post()
  create(@Body() clientDTO: DTOClient): Promise<IHttpResponse> {
    return this.clientsService.create(clientDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al cliente y actualiarlo',
  })
  @ApiBody({
    description: 'Modelo para actualización de clientes',
    type: DTOClient,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() clientDTO: DTOClient,
  ): Promise<IHttpResponse> {
    return this.clientsService.update(id, clientDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al cliente y eliminarlo',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<IHttpResponse> {
    return this.clientsService.delete(id);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al cliente y retornar sus tiquetes',
  })
  @Get('/tickets/:id')
  getTickets(@Param('id') id: string): Promise<IHttpResponse> {
    return this.clientsService.getTickets(id);
  }
}

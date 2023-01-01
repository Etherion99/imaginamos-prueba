import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IHttpResponse } from '../../interfaces/http-response.interface';
import { IClient } from '../../models/client/client.interface';
import { ClientsService } from './clients.service';

@Controller('Clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IHttpResponse> {
    return this.clientsService.findOne(id);
  }

  @Post()
  create(@Body() clientDTO: IClient): Promise<IHttpResponse> {
    return this.clientsService.create(clientDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() clientDTO: IClient,
  ): Promise<IHttpResponse> {
    return this.clientsService.update(id, clientDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IHttpResponse> {
    return this.clientsService.delete(id);
  }

  @Get('/tickets/:id')
  getTickets(@Param('id') id: string): Promise<IHttpResponse> {
    return this.clientsService.getTickets(id);
  }
}

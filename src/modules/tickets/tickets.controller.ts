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
import { ITicket } from '../../models/ticket/ticket.interface';
import { TicketsService } from './tickets.service';

@Controller('Tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<IHttpResponse> {
    return this.ticketsService.findOne(id);
  }

  @Post()
  create(@Body() ticketDTO: ITicket): Promise<IHttpResponse> {
    return this.ticketsService.create(ticketDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() ticketDTO: ITicket,
  ): Promise<IHttpResponse> {
    return this.ticketsService.update(id, ticketDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<IHttpResponse> {
    return this.ticketsService.delete(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IHttpResponse } from 'src/interfaces/http-response.interface';
import { ITechnician } from '../../models/technician/technician.interface';
import { TechniciansService } from './technicians.service';

@Controller('Technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.techniciansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<IHttpResponse> {
    return this.techniciansService.findOne(id);
  }

  @Post()
  create(@Body() technicianDTO: ITechnician): Promise<IHttpResponse> {
    return this.techniciansService.create(technicianDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() technicianDTO: ITechnician,
  ): Promise<IHttpResponse> {
    return this.techniciansService.update(id, technicianDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<IHttpResponse> {
    return this.techniciansService.delete(id);
  }

  @Get('/tickets/:id')
  getTickets(@Param('id') id: number): Promise<IHttpResponse> {
    return this.techniciansService.getTickets(id);
  }
}

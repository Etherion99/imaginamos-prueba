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
import { IMunicipality } from '../../models/municipality/municipality.interface';
import { MunicipalitiesService } from './municipalities.service';

@Controller('Municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.municipalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<IHttpResponse> {
    return this.municipalitiesService.findOne(id);
  }

  @Post()
  create(@Body() municipalityDTO: IMunicipality): Promise<IHttpResponse> {
    return this.municipalitiesService.create(municipalityDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() municipalityDTO: IMunicipality,
  ): Promise<IHttpResponse> {
    return this.municipalitiesService.update(id, municipalityDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<IHttpResponse> {
    return this.municipalitiesService.delete(id);
  }
}

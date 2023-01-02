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
import { DTOMunicipality } from '../../models/municipality/municipality.dto';
import { MunicipalitiesService } from './municipalities.service';
@ApiTags('Modulo Municipios')
@Controller('Municipalities')
export class MunicipalitiesController {
  constructor(private readonly municipalitiesService: MunicipalitiesService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.municipalitiesService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'Identificador utilizado para encontrar al municipio',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IHttpResponse> {
    return this.municipalitiesService.findOne(id);
  }

  @ApiBody({ description: 'Modelo para creación de muniipios', type: DTOMunicipality })
  @Post()
  create(@Body() municipalityDTO: DTOMunicipality): Promise<IHttpResponse> {
    return this.municipalitiesService.create(municipalityDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al municipio y actualiarlo',
  })
  @ApiBody({
    description: 'Modelo para actualización de municipios',
    type: DTOMunicipality,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() municipalityDTO: DTOMunicipality,
  ): Promise<IHttpResponse> {
    return this.municipalitiesService.update(id, municipalityDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al municipio y eliminarlo',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<IHttpResponse> {
    return this.municipalitiesService.delete(id);
  }
}

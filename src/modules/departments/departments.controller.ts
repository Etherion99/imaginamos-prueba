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
import { DTODepartment } from '../../models/department/department.dto';
import { DepartmentsService } from './departments.service';
@ApiTags('Modulo Departamentos')
@Controller('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.departmentsService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'Identificador utilizado para encontrar al departamento',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<IHttpResponse> {
    return this.departmentsService.findOne(id);
  }

  @ApiBody({
    description: 'Modelo para creación de departamentos',
    type: DTODepartment,
  })
  @Post()
  create(@Body() departmentDTO: DTODepartment): Promise<IHttpResponse> {
    return this.departmentsService.create(departmentDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al departamento y actualiarlo',
  })
  @ApiBody({
    description: 'Modelo para actualización de departamentos',
    type: DTODepartment,
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() departmentDTO: DTODepartment,
  ): Promise<IHttpResponse> {
    return this.departmentsService.update(id, departmentDTO);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al departamento y eliminarlo',
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<IHttpResponse> {
    return this.departmentsService.delete(id);
  }

  @ApiParam({
    name: 'id',
    description:
      'Identificador utilizado para encontrar al departamento y retornar sus tiquetes',
  })
  @Get('/municipalities/:id')
  getMunicipalities(@Param('id') id: string): Promise<IHttpResponse> {
    return this.departmentsService.getMunicipalities(id);
  }
}

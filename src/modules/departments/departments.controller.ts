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
import { IDepartment } from '../../models/department/department.interface';
import { DepartmentsService } from './departments.service';

@Controller('Departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  findAll(): Promise<IHttpResponse> {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<IHttpResponse> {
    return this.departmentsService.findOne(id);
  }

  @Post()
  create(@Body() departmentDTO: IDepartment): Promise<IHttpResponse> {
    return this.departmentsService.create(departmentDTO);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() departmentDTO: IDepartment,
  ): Promise<IHttpResponse> {
    return this.departmentsService.update(id, departmentDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<IHttpResponse> {
    return this.departmentsService.delete(id);
  }
}

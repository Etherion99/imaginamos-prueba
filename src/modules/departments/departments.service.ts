import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from '../../models/department/department.entity';
import { IDepartment } from '../../models/department/department.interface';
import { Repository } from 'typeorm';
import { IHttpResponse } from '../../interfaces/http-response.interface';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentsRepository: Repository<DepartmentEntity>,
  ) {}

  async create(departmentDTO: IDepartment): Promise<IHttpResponse> {
    try {
      const department = new DepartmentEntity();

      department.name = departmentDTO.name;

      const saved = await this.departmentsRepository.save(department);

      return {
        success: true,
        data: saved,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findOne(id: number): Promise<IHttpResponse> {
    try {
      const department = await this.departmentsRepository.findOneBy({ id });

      return {
        success: true,
        data: department,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findAll(): Promise<IHttpResponse> {
    try {
      const departments = await this.departmentsRepository.find();

      return {
        success: true,
        data: departments,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: number, departmentDTO: IDepartment): Promise<IHttpResponse> {
    try {
      const department = await this.departmentsRepository.findOneBy({ id });
      const updated = Object.assign(department, departmentDTO);
      const saved = await this.departmentsRepository.save(updated);

      return {
        success: true,
        data: saved,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async delete(id: number): Promise<IHttpResponse> {
    try {
      const deleted =
        (await this.departmentsRepository.delete(id)).affected > 0;

      return {
        success: deleted,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getMunicipalities(id: number): Promise<IHttpResponse> {
    try {
      const client = await this.departmentsRepository.findOne({
        where: { id },
        relations: ['municipalities'],
      });

      return {
        success: true,
        data: client.municipalities,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

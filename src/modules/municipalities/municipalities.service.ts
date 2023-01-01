import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MunicipalityEntity } from '../../models/municipality/municipality.entity';
import { IMunicipality } from '../../models/municipality/municipality.interface';
import { Repository } from 'typeorm';
import { IHttpResponse } from '../../interfaces/http-response.interface';
import { DepartmentEntity } from '../../models/department/department.entity';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(MunicipalityEntity)
    private readonly municipalitiesRepository: Repository<MunicipalityEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentsRepository: Repository<DepartmentEntity>,
  ) {}

  async create(municipalityDTO: IMunicipality): Promise<IHttpResponse> {
    try {
      const municipality = new MunicipalityEntity();

      municipality.name = municipalityDTO.name;

      const saved = await this.municipalitiesRepository.save(municipality);

      const department = await this.departmentsRepository.findOne({
        where: {
          id: municipalityDTO.department.id,
        },
        relations: ['municipalities'],
      });

      department.municipalities.push(saved);

      await this.departmentsRepository.save(department);

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

  async findOne(id: string): Promise<IHttpResponse> {
    try {
      const municipality = await this.municipalitiesRepository.findOneBy({
        id,
      });

      return {
        success: true,
        data: municipality,
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
      const municipalities = await this.municipalitiesRepository.find();

      return {
        success: true,
        data: municipalities,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(
    id: string,
    municipalityDTO: IMunicipality,
  ): Promise<IHttpResponse> {
    try {
      const municipality = await this.municipalitiesRepository.findOneBy({
        id,
      });
      const updated = Object.assign(municipality, municipalityDTO);
      const saved = await this.municipalitiesRepository.save(updated);

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

  async delete(id: string): Promise<IHttpResponse> {
    try {
      const deleted =
        (await this.municipalitiesRepository.delete(id)).affected > 0;

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
}

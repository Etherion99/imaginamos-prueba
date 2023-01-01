import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TechnicianEntity } from '../../models/technician/technician.entity';
import { ITechnician } from '../../models/technician/technician.interface';
import { Repository } from 'typeorm';
import { IHttpResponse } from '../../interfaces/http-response.interface';

@Injectable()
export class TechniciansService {
  constructor(
    @InjectRepository(TechnicianEntity)
    private readonly techniciansRepository: Repository<TechnicianEntity>,
  ) {}

  async create(technicianDTO: ITechnician): Promise<IHttpResponse> {
    try {
      const technician = new TechnicianEntity();

      technician.firstName = technicianDTO.firstName;
      technician.lastName = technicianDTO.lastName;
      technician.admissionDate = technicianDTO.admissionDate;

      const saved = await this.techniciansRepository.save(technician);

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
      const technician = await this.techniciansRepository.findOneBy({ id });

      return {
        success: true,
        data: technician,
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
      const technicians = await this.techniciansRepository.find();

      return {
        success: true,
        data: technicians,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: string, technicianDTO: ITechnician): Promise<IHttpResponse> {
    try {
      const technician = await this.techniciansRepository.findOneBy({ id });
      const updated = Object.assign(technician, technicianDTO);
      const saved = await this.techniciansRepository.save(updated);

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
        (await this.techniciansRepository.delete(id)).affected > 0;

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

  async getTickets(id: string): Promise<IHttpResponse> {
    try {
      const client = await this.techniciansRepository.findOne({
        where: { id },
        relations: ['tickets'],
      });

      return {
        success: true,
        data: client.tickets,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

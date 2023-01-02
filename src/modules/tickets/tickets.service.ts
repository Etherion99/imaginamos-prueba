import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from '../../models/ticket/ticket.entity';
import { DTOTicket } from '../../models/ticket/ticket.dto';
import { Repository } from 'typeorm';
import { IHttpResponse } from '../../interfaces/http-response.interface';
import { MunicipalityEntity } from '../../models/municipality/municipality.entity';
import { ClientEntity } from '../../models/client/client.entity';
import { TechnicianEntity } from '../../models/technician/technician.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketsRepository: Repository<TicketEntity>,
    @InjectRepository(MunicipalityEntity)
    private readonly municipalitiesRepository: Repository<MunicipalityEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
    @InjectRepository(TechnicianEntity)
    private readonly techniciansRepository: Repository<TechnicianEntity>,
  ) {}

  async create(ticketDTO: DTOTicket): Promise<IHttpResponse> {
    try {
      const ticket = new TicketEntity();

      ticket.address = ticketDTO.address;
      ticket.payment = ticketDTO.payment;
      ticket.comments = ticketDTO.comments;
      ticket.serviceDate = ticketDTO.serviceDate;
      ticket.done = ticketDTO.done;

      const saved = await this.ticketsRepository.save(ticket);

      const client = await this.clientsRepository.findOne({
        where: {
          id: ticketDTO.client.id,
        },
        relations: ['tickets'],
      });

      client.tickets.push(saved);
      await this.clientsRepository.save(client);

      const technician = await this.techniciansRepository
        .createQueryBuilder('technicians')
        .select()
        .orderBy('RANDOM()')
        .getOne();

      await this.techniciansRepository
        .createQueryBuilder()
        .relation(TechnicianEntity, 'tickets')
        .of(technician)
        .add(saved);

      const municipality = await this.municipalitiesRepository.findOne({
        where: {
          id: ticketDTO.municipality.id,
        },
        relations: ['tickets'],
      });

      municipality.tickets.push(saved);
      await this.municipalitiesRepository.save(municipality);

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
      const ticket = await this.ticketsRepository.findOne({
        where: {
          id,
        },
        relations: ['technician', 'client', 'municipality'],
      });

      return {
        success: true,
        data: ticket,
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
      const tickets = await this.ticketsRepository.find({
        relations: ['technician', 'client', 'municipality'],
      });

      return {
        success: true,
        data: tickets,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: string, ticketDTO: DTOTicket): Promise<IHttpResponse> {
    try {
      const ticket = await this.ticketsRepository.findOneBy({
        id,
      });
      const updated = Object.assign(ticket, ticketDTO);
      const saved = await this.ticketsRepository.save(updated);

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
      const deleted = (await this.ticketsRepository.delete(id)).affected > 0;

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

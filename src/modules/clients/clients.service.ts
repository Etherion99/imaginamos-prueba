import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from '../../models/client/client.entity';
import { IClient } from '../../models/client/client.interface';
import { Repository } from 'typeorm';
import { IHttpResponse } from '../../interfaces/http-response.interface';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
  ) {}

  async create(clientDTO: IClient): Promise<IHttpResponse> {
    try {
      const client = new ClientEntity();

      client.firstName = clientDTO.firstName;
      client.lastName = clientDTO.lastName;

      const saved = await this.clientsRepository.save(client);

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
      const client = await this.clientsRepository.findOneBy({ id });

      return {
        success: true,
        data: client,
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
      const clients = await this.clientsRepository.find();

      return {
        success: true,
        data: clients,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async update(id: number, clientDTO: IClient): Promise<IHttpResponse> {
    try {
      const client = await this.clientsRepository.findOneBy({ id });
      const updated = Object.assign(client, clientDTO);
      const saved = await this.clientsRepository.save(updated);

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
      const deleted = (await this.clientsRepository.delete(id)).affected > 0;

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

  async getTickets(id: number): Promise<IHttpResponse> {
    try {
      const client = await this.clientsRepository.findOne({
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

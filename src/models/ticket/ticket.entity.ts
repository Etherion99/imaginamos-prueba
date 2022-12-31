import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from '../client/client.entity';
import { MunicipalityEntity } from '../municipality/municipality.entity';
import { TechnicianEntity } from '../technician/technician.entity';
import { ITicket } from './ticket.interface';

@Entity()
export class TicketEntity implements ITicket {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne((type) => ClientEntity, (client) => client.tickets)
  client: ClientEntity;

  @ManyToOne((type) => TechnicianEntity, (technician) => technician.tickets)
  technician: TechnicianEntity;

  @ManyToOne(
    (type) => MunicipalityEntity,
    (municipality) => municipality.tickets,
  )
  municipality: MunicipalityEntity;

  @Column()
  address: string;

  @Column()
  payment: number;

  @Column()
  comments: string;

  @Column()
  service_date: Date;
}

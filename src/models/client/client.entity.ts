import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from '../ticket/ticket.entity';
import { IClient } from './client.interface';

@Entity()
export class ClientEntity implements IClient {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany((type) => TicketEntity, (ticket) => ticket.client)
  tickets: TicketEntity[];
}

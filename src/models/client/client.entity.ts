import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from '../ticket/ticket.entity';
import { DTOClient } from './client.dto';

@Entity()
export class ClientEntity implements DTOClient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany((type) => TicketEntity, (ticket) => ticket.client)
  tickets: TicketEntity[];
}

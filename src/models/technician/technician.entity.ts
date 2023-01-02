import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from '../ticket/ticket.entity';
import { DTOTechnician } from './technician.dto';

@Entity()
export class TechnicianEntity implements DTOTechnician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  admissionDate: Date;

  @OneToMany((type) => TicketEntity, (tiquete) => tiquete.technician)
  tickets: TicketEntity[];
}

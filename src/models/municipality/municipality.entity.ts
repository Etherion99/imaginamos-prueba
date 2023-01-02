import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';
import { TicketEntity } from '../ticket/ticket.entity';
import { DTOMunicipality as DTOMunicipality } from './municipality.dto';

@Entity()
export class MunicipalityEntity implements DTOMunicipality {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    (type) => DepartmentEntity,
    (department) => department.municipalities,
  )
  department: DepartmentEntity;

  @OneToMany((type) => TicketEntity, (tiquete) => tiquete.municipality)
  tickets: TicketEntity[];
}

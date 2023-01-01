import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';
import { TicketEntity } from '../ticket/ticket.entity';
import { IMunicipality as IMunicipality } from './municipality.interface';

@Entity()
export class MunicipalityEntity implements IMunicipality {
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

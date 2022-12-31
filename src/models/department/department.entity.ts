import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MunicipalityEntity } from '../municipality/municipality.entity';
import { IDepartment } from './department.interface';

@Entity()
export class DepartmentEntity implements IDepartment {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(
    (type) => MunicipalityEntity,
    (municipality) => municipality.department,
  )
  municipalities: MunicipalityEntity[];
}

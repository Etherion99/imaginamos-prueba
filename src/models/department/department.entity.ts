import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MunicipalityEntity } from '../municipality/municipality.entity';
import { DTODepartment } from './department.dto';

@Entity()
export class DepartmentEntity implements DTODepartment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    (type) => MunicipalityEntity,
    (municipality) => municipality.department,
  )
  municipalities: MunicipalityEntity[];
}

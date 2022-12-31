import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from '../../models/department/department.entity';
import { MunicipalityEntity } from '../../models/municipality/municipality.entity';
import { MunicipalitiesController } from './municipalities.controller';
import { MunicipalitiesService } from './municipalities.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MunicipalityEntity]),
    TypeOrmModule.forFeature([DepartmentEntity]),
  ],
  providers: [MunicipalitiesService],
  controllers: [MunicipalitiesController],
})
export class MunicipalitiesModule {}

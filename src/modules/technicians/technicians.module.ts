import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicianEntity } from '../../models/technician/technician.entity';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';

@Module({
  imports: [TypeOrmModule.forFeature([TechnicianEntity])],
  providers: [TechniciansService],
  controllers: [TechniciansController],
})
export class TechniciansModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../../models/client/client.entity';
import { MunicipalityEntity } from '../../models/municipality/municipality.entity';
import { TechnicianEntity } from '../../models/technician/technician.entity';
import { TicketEntity } from '../../models/ticket/ticket.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    TypeOrmModule.forFeature([MunicipalityEntity]),
    TypeOrmModule.forFeature([ClientEntity]),
    TypeOrmModule.forFeature([TechnicianEntity]),
  ],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}

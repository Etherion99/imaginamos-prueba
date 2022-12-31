import { Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../models/client/client.entity';
import { DepartmentEntity } from '../models/department/department.entity';
import { MunicipalityEntity } from '../models/municipality/municipality.entity';
import { TechnicianEntity } from '../models/technician/technician.entity';
import { TicketEntity } from '../models/ticket/ticket.entity';

@Injectable()
export class DatabaseProvider {
  static getDatabaseModule() {
    return TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<any>('db.type'),
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.user'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        entities: [
          ClientEntity,
          DepartmentEntity,
          MunicipalityEntity,
          TechnicianEntity,
          TicketEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    });
  }
}

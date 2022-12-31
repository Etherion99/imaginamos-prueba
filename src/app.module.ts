import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './modules/clients/clients.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { MunicipalitiesModule } from './modules/municipalities/municipalities.module';
import { TechniciansModule } from './modules/technicians/technicians.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ConfigProvider } from './providers/config.provider';
import { DatabaseProvider } from './providers/database.provider';

@Module({
  imports: [
    ConfigProvider.getConfigModule(),
    DatabaseProvider.getDatabaseModule(),
    ClientsModule,
    DepartmentsModule,
    MunicipalitiesModule,
    TechniciansModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigProvider],
})
export class AppModule {}

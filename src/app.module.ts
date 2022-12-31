import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProvider } from './providers/config.provider';
import { DatabaseProvider } from './providers/database.provider';

@Module({
  imports: [
    ConfigProvider.getConfigModule(),
    DatabaseProvider.getDatabaseModule(),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigProvider],
})
export class AppModule {}

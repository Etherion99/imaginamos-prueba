import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig, { validationSchema } from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';

@Injectable()
export class ConfigProvider {
  static getConfigModule() {
    return ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
      envFilePath: ['.env', '.env.dev', '.env.prod'],
      validationSchema: validationSchema,
    });
  }
}

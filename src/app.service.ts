import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Imaginamos prueba técnica NestJS, Swagger, Docker, Serverless';
  }
}

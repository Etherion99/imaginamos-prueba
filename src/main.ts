import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const configSwagger = new DocumentBuilder()
    .setTitle('Imaginamos Prueba Técnica')
    .setDescription(
      'API para generar órdenes de servicio para el mantenimiento e instalación de soportes para TV',
    )
    .setVersion('1.0')
    .build();

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, configSwagger),
  );

  await app.listen(configService.get('app.port'));
}
bootstrap();

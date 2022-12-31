import * as Joi from '@hapi/joi';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
}));

export const validationSchema = Joi.object({
  APP_PORT: Joi.number().default(3001),
  APP_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  DB_TYPE: Joi.string().valid('mysql', 'postgres').default('postgres'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().default('root'),
  DB_PASSWORD: Joi.string().default(''),
  DB_DATABASE: Joi.string().default('main'),
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import 'dotenv/config';
import { TransformResponseInterceptor } from './interceptors/response.interceptor';
import { AllExceptionFilter } from './exceptions/exception.filter';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const client = new Redis({
    password: process.env.redis_password,
  });
  const store = new RedisStore({ client });
  app.enableCors();
  app.use(
    session({
      store,
      secret: process.env.session_secret,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();

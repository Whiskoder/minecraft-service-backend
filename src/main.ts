import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

import * as compression from 'compression';

import { AppModule } from '@app/app.module';
import { envs } from '@config/envs.config';
import { RpcCustomExceptionFilter } from '@common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {
  const $logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(compression());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);
  $logger.log(`Server is running on ${envs.port} port`);
}
bootstrap();

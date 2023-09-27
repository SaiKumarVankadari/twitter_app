import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Your Mini Project API')
    .setDescription('API documentation for Your Mini Project')
    .setVersion('1.0')
    .addTag('your-mini-project')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  Sentry.init({
    dsn: 'https://83b4b286fee9cf7fae54e150245977cf@o4505923278995456.ingest.sentry.io/4505923292495872',
    // Additional configuration options here
  });
  
  await app.listen(3000);
}

bootstrap();

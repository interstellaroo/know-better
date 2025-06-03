import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'knowBetter'
    })
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Cookie parser
  app.use(cookieParser());

  // Swagger
  const conifg = new DocumentBuilder()
    .setTitle('knowBetter API')
    .setDescription('API service for knowBetter')
    .setVersion('1.0')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, conifg);
  const theme = new SwaggerTheme();
  const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
  }
  SwaggerModule.setup('api', app, documentFactory, options);
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
  
  await app.listen(5050);
}

bootstrap();

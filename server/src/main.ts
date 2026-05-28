import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // ── CORS ────────────────────────────────────────────────────
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:4200',
    credentials: true,
  });

  // ── Compression ──────────────────────────────────────────────
  app.use(compression());

  // ── Préfixe global ───────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Validation globale ───────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // ── Swagger ──────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Fusion Summit Capital Markets API')
    .setDescription('API de simulation Fusion Summit / Fusion Kondor — Capital Markets')
    .setVersion('1.0.0')
    .addTag('Trades')
    .addTag('Bonds')
    .addTag('Counterparties')
    .addTag('Trade Tasks')
    .addTag('Repos')
    .addTag('CDS')
    .addTag('Derivatives')
    .addTag('FX Spot')
    .addTag('FX Swap')
    .addTag('Valuations')
    .addTag('Market Data')
    .addTag('Static Data')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // ── Démarrage ────────────────────────────────────────────────
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Server running on: http://localhost:${port}/api`);
  logger.log(`📚 Swagger docs:      http://localhost:${port}/api/docs`);
}

bootstrap();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const compression = require("compression");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    app.enableCors({
        origin: process.env.CLIENT_URL || 'http://localhost:4200',
        credentials: true,
    });
    app.use(compression());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
    }));
    const config = new swagger_1.DocumentBuilder()
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
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    logger.log(`🚀 Server running on: http://localhost:${port}/api`);
    logger.log(`📚 Swagger docs:      http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map
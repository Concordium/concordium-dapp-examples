import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module.js'
import { HttpExceptionFilter } from './common/filters/htttp-exception.filter.js'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://allowlist.devnet-plt-alpha.concordium.com'], //frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter())

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Token Distribution dApp API')
    .setDescription('Backend API for Concordium Token Distribution dApp with atomic operations')
    .setVersion('2.0')
    .addTag('token-distribution', 'Single-transaction token distribution operations')
    .addTag('legacy-compatibility', 'Backward-compatible endpoints')
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3001)
  
}
bootstrap()
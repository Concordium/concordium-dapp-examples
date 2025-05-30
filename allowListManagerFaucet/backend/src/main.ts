import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module.js'
import { HttpExceptionFilter } from './common/filters/htttp-exception.filter.js'
async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], //frontend URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
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
    .setTitle('Allow List dApp API')
    .setDescription('Backend API for Concordium Allow List dApp')
    .setVersion('1.0')
    .addTag('allowlist')
    .addTag('mint')
    .addTag('payment')
    .build()
  
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3001)
  console.log('Backend server running on http://localhost:3001')
  console.log('API documentation available at http://localhost:3001/api')
}
bootstrap()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], //MODIFY FOR PRODUCTION
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })

  const port = process.env.PORT || 3002
  await app.listen(port)
  console.log(`Sponsored Transactions backend running on http://localhost:${port}`)
}

bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSession, TokenGuard } from '@finastra/nestjs-oidc';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(app.get(TokenGuard));

  app.use(compression());

  setupSession(app, 'Account Services');

  const port = process.env.PORT || 3000;
  await app.listen(port, async () => {
    Logger.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();

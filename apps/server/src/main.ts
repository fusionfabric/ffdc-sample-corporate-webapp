import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSession, getTokenStore, TokenGuard } from '@ffdc/nestjs-oidc';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const issuer = app.get(ConfigService).get('OIDC_ISSUER');
  const tokenStore = await getTokenStore(issuer);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new TokenGuard(tokenStore, reflector));

  app.use(compression());

  setupSession(app);
  //setupStatic(app);

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();

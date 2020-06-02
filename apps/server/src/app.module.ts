import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OidcModule } from '@ffdc/nestjs-oidc';
import { ProxyModule } from '@ffdc/nestjs-proxy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyConfigService } from './configs/proxy-config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { CorporateAccountsModule } from '@ffdc/api_corporate-accounts';
import { GqlConfigService } from './configs/graphql-config.service';
import { OidcConfigService } from './configs/oidc-config.service';
import { ServiceStaticConfigService } from './configs/serve-startic-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    OidcModule.forRootAsync({
      imports: [ConfigModule],
      useClass: OidcConfigService,
    }),
    ServeStaticModule.forRootAsync({
      useClass: ServiceStaticConfigService,
    }),
    ProxyModule.forRootAsync({
      useClass: ProxyConfigService,
      imports: [ConfigModule],
    }),
    CorporateAccountsModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

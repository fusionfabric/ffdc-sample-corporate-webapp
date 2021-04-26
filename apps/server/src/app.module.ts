import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OidcModule } from '@finastra/nestjs-oidc';
import { ProxyModule } from '@finastra/nestjs-proxy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyConfigService } from './configs/proxy-config.service';
import { GraphQLModule } from '@nestjs/graphql';
import { CorporateAccountsModule } from '@finastra/api_corporate-accounts';
import { GqlConfigService } from './configs/graphql-config.service';
import { OidcConfigService } from './configs/oidc-config.service';
import { ServiceStaticConfigService } from './configs/serve-startic-config.service';
import { CurrencyModule } from './currency-conversion-api/currency.module';
import { CorpAccountsConfigService } from './configs/corp-accounts-config.service';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [
    CurrencyModule,
    BalanceModule,
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
    CorporateAccountsModule.forRootAsync({
      useClass: CorpAccountsConfigService,
      imports: [ConfigModule],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

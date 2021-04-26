import { Injectable, Logger } from '@nestjs/common';
import { OidcOptionsFactory, OidcModuleOptions } from '@finastra/nestjs-oidc';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OidcConfigService implements OidcOptionsFactory {
  readonly logger = new Logger(OidcConfigService.name);

  constructor(private configService: ConfigService) {}

  createModuleConfig(): OidcModuleOptions {
    const issuer = this.configService.get('OIDC_ISSUER');
    const client_id = this.configService.get('OIDC_CLIENT_ID');
    const origin = this.configService.get('OIDC_ORIGIN');

    this.logger.log(`
issuer     : ${issuer}
client_id  : ${client_id}
origin     : ${origin}`);

    return {
      issuer,
      clientMetadata: {
        client_id,
        client_secret: this.configService.get('OIDC_CLIENT_SECRET'),
      },
      authParams: {
        scopes: this.configService.get('OIDC_SCOPES'),
        resource: this.configService.get('OIDC_RESOURCE'),
        nonce: uuidv4(),
      },
      origin,
      defaultHttpOptions: {
        timeout: 40000,
      },
    };
  }
}

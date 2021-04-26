import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  ProxyModuleOptions,
  ProxyModuleOptionsFactory,
} from '@finastra/nestjs-proxy';

@Injectable()
export class ProxyConfigService implements ProxyModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  createModuleConfig(): ProxyModuleOptions {
    const FFDC = this.configService.get('FFDC');

    const services = [
      {
        id: 'CORPORATE_ACCOUNTS',
        url: `${FFDC}/corporate/channels/accounts/me/v1/accounts`,
      },
    ];

    return {
      services,
    };
  }
}

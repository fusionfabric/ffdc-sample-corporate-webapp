import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import {
  CorpAccountsModuleOptions,
  CorpAccountsModuleOptionsFactory,
} from '@finastra/api_corporate-accounts';

@Injectable()
export class CorpAccountsConfigService
  implements CorpAccountsModuleOptionsFactory
{
  constructor(private configService: ConfigService) {}

  createModuleConfig(): CorpAccountsModuleOptions {
    const ffdcApi = this.configService.get('FFDC');
    const config = {
      ffdcApi,
    };
    return config;
  }
}

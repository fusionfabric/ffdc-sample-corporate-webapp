import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { CorporateAccountsModule } from '@finastra/api_corporate-accounts';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    const playgroundDevOptions = {
      settings: {
        'request.credentials': 'include',
      },
    };
    return {
      typePaths: ['./node_modules/@finastra/api_corporate-accounts/**/*.graphql'],
      include: [CorporateAccountsModule],
      playground:
        process.env.NODE_ENV === 'production' ? false : playgroundDevOptions,
    };
  }
}

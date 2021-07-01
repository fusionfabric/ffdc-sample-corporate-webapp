import { HttpService, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { expand, map, reduce } from 'rxjs/operators';
import {
  AccountType,
  AccountwBalanceRes,
} from '@finastra/api_corporate-accounts';
import { of } from 'rxjs';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger(BalanceService.name);

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  getAllBalances(
    token: string,
    accountType: AccountType,
    equivalentCurrency: string = 'USD'
  ) {
    let currentPage = 1;
    const limit = 200;

    return this.getBalancesByAccountTypes(
      token,
      accountType,
      equivalentCurrency,
      limit
    ).pipe(
      expand((response) => {
        const { pageCount } = response._meta;
        if (pageCount !== currentPage) {
          return this.getBalancesByAccountTypes(
            token,
            accountType,
            equivalentCurrency,
            limit,
            currentPage++ * limit
          );
        }
        return of();
      }),
      reduce(
        (acc, element: AccountwBalanceRes) => acc.concat(element.items),
        []
      )
    );
  }

  getBalancesByAccountTypes(
    token: string,
    accountType: AccountType,
    equivalentCurrency: string = 'USD',
    limit = 200,
    offset = 0
  ) {
    return this.request<AccountwBalanceRes>(
      `balances-by-account-type?accountTypeForBalance=${accountType}&equivalentCurrency=${equivalentCurrency}&limit=${limit}&offset=${offset}`,
      token
    );
  }

  private request<T>(path: string, token: string) {
    const FFDC = this.configService.get('FFDC');
    const url = `${FFDC}/corporate/channels/accounts/me/v1/accounts/${path}`;

    this.logger.log(`GET ${url}`);
    return this.httpService
      .get<T>(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(map((response) => response.data));
  }
}

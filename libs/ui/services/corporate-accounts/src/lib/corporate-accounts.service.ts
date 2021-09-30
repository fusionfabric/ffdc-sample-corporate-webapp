import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import {PROXY_URL, CORPORATE_ACCOUNTS_SERVICE} from '@ffdc-corporate-banking-sample/ui/core'
import { map } from 'rxjs/operators';
import {
  AccountContext,
  AccountBasicRes,
  AccountType,
  AccountwBalanceRes,
} from '@finastra/api_corporate-accounts/interfaces';

@Injectable({
  providedIn: 'any',
})
export class CorporateAccountsService {
  constructor(
    private http: HttpClient,
    @Inject(PROXY_URL) protected proxyUrl: string,
    @Inject(CORPORATE_ACCOUNTS_SERVICE) protected corporateAccounts: string,
  ) {}

  getAccounts(
    accountContext: AccountContext.ViewAccount,
    limit = 10,
    offset = 0,
  ) {
    return this.get<AccountBasicRes[]>(
      `?accountContext=${accountContext}&limit=${limit}&offset=${offset}`,
    );
  }

  getBalancesByAccountType(
    accountType: AccountType.CURRENT,
    equivalentCurrency: string = 'USD',
    limit = 10,
    offset = 0,
  ) {
    return this.get<AccountwBalanceRes>(
      `/balances-by-account-type?accountTypeForBalance=${accountType}&equivalentCurrency=${equivalentCurrency}&limit=${limit}&offset=${offset}`,
    ).pipe(
      map((accounts:AccountwBalanceRes) => {
        accounts.items = accounts.items.map((account) => {
          account.availableBalance = this.sanitizeNumber(
            account.availableBalance,
          );
          account.availableBalanceEquivalent = this.sanitizeNumber(
            account.availableBalanceEquivalent,
          );
          return account;
        });
        return accounts;
      }),
    );
  }

  private get<T>(target: string) {
    return this.http.get<T>(this.proxyUrl, {
      params: {
        serviceId: this.corporateAccounts,
        target,
      },
    });
  }

  private sanitizeNumber(nb: string) {
    return nb.replace(/\,/g, '');
  }
}

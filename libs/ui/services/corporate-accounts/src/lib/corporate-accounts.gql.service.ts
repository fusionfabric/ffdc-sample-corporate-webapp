import { Injectable } from '@angular/core';
import { shareReplay, map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  AccountwBalanceRes,
  AccountType,
  AccountStatementRes,
} from '@ffdc/api_corporate-accounts/interfaces';

@Injectable({
  providedIn: 'any',
})
export class CorporateAccountsGQLService {
  constructor(private apollo: Apollo) {}

  getAccounts(
    accountType: AccountType = AccountType.CURRENT,
    equivalentCurrency: string = 'USD',
    limit = 10,
    offset = 0
  ) {
    return this.apollo
      .query<{ accountsBalance: AccountwBalanceRes }>({
        query: gql`
          {
            accountsBalance(
              accountType: ${accountType}
              equivalentCurrency: "${equivalentCurrency}"
              limit: ${limit}
              offset: ${offset}
              fromDate: "2018-01-03"
              toDate: "2020-03-05"
            ) {
              items {
                id
                currency
                availableBalance
                details {
                  number
                  country
                  bankShortName
                }
                statement {
                  items {
                    amount
                    transactionType
                    currency
                    postingDate
                  }
                }
              }
              _meta {
                itemCount
              }
            }
          }
        `,
      })
      .pipe(
        shareReplay(1),
        map((result) => result.data && result.data.accountsBalance)
      );
  }
}

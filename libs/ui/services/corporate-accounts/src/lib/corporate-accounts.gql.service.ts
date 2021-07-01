import { Injectable } from '@angular/core';
import { shareReplay, map,retry } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
  AccountwBalanceRes,
  AccountType,
  AccountStatementRes,
} from '@finastra/api_corporate-accounts/interfaces';

@Injectable({
  providedIn: 'any',
})
export class CorporateAccountsGQLService {
  constructor(private apollo: Apollo) {}

  getAccountStatement(accountId,limit = 200) {
    return this.apollo
    .query<{ accountStatement: AccountStatementRes }>({
      query: gql`
        {
          accountStatement(id: ${accountId}, fromDate: "2018-01-03", toDate: "2020-03-05",limit: ${limit}) {
            items {
              currency
              balance
              amount
              postingDate
              valueDate
              transactionType
            }
            _meta {
              limit,
              itemCount
            }
          }
        }
      `,
    })
    .pipe(
      shareReplay(1),
      retry(10),
      map((result) => result.data.accountStatement.items)
    );
  }

  getAccounts(
    accountType: AccountType = AccountType.CURRENT,
    equivalentCurrency: string = 'USD',
    limit = 200,
  ) {
    return this.apollo
      .query<{ accountsBalance: AccountwBalanceRes }>({
        query: gql`
          {
            accountsBalance(
              accountType: ${accountType}
              equivalentCurrency: "${equivalentCurrency}"
              limit: ${limit}
              fromDate: "2018-01-03"
              toDate: "2020-03-05"
            ) {
              items {
                id
                currency
                availableBalance
                availableBalanceEquivalent
                details {
                  number
                  country
                  bankShortName
                }
              }
              _meta {
                limit,
                itemCount,
                pageCount,
              }
            }
          }
        `,
      })
      .pipe(
        shareReplay(1),
        retry(50),
        map((result) => result.data && result.data.accountsBalance)
      );
  }
}

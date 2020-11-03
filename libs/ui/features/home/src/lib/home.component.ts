import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  CorporateAccountsService,
  CorporateAccountsGQLService,
} from '@ffdc-corporate-banking-sample/ui/services/corporate-accounts';
import {
  AccountType,
  AccountwBalanceRes,
  AccountStatement,
} from '@ffdc/api_corporate-accounts/interfaces';
import { HttpClient } from '@angular/common/http';
import {Rates} from "@ffdc-corporate-banking-sample/data"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  accounts$: Observable<AccountwBalanceRes>;
  transactions$ = new Subject<AccountStatement[]>();
  currencyRates$:Observable<Rates>
  currentPage = 0;
  maxPage = 0;

  constructor(
    private corpAccounts: CorporateAccountsService,
    private corpAccountsGQL: CorporateAccountsGQLService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.getAccounts();
    this.getCurrencyRates()
  }

  getCurrencyRates() {
    this.currencyRates$=this.http.get<Rates>('/rateBase?base=EUR');
  }

  getAccounts() {
    // this.accounts$ = this.corpAccounts.getBalancesByAccountType();
 
    this.accounts$ = this.corpAccountsGQL.getAccounts(
      AccountType.CURRENT,
      'USD',
      4,
      this.currentPage
    );

  this.accounts$.subscribe((accounts) => {
    this.maxPage = accounts._meta.itemCount-1;
    this.transactions$.next(
      [].concat(...accounts.items.map((account) => account.statement.items))
    );
  });
  }

  previousPage() {
    this.currentPage--;
    this.getAccounts();
  }

  nextPage() {
    this.currentPage++;
    this.getAccounts();
  }
}

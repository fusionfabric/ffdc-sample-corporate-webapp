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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accounts$: Observable<AccountwBalanceRes>;
  transactions$ = new Subject<AccountStatement[]>();
  currentPage = 0;
  maxPage = 0;

  constructor(
    private corpAccounts: CorporateAccountsService,
    private corpAccountsGQL: CorporateAccountsGQLService,
    private http: HttpClient
  ) {
    this.fetch()
  }

  ngOnInit() {
    this.getAccounts();
  }

  fetch() {
    this.http.get<any[]>('/rates').subscribe((t) => console.log(t));
    this.http.get<any[]>('/convert?fromCurrency=EUR&toCurrency=USD&amount=1').subscribe((t) => console.log(t));
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

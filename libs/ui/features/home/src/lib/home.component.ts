import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { concat, Observable, Subject, throwError } from 'rxjs';
import {
  CorporateAccountsService,
  CorporateAccountsGQLService,
} from '@ffdc-corporate-banking-sample/ui/services/corporate-accounts';
import {
  AccountType,
  AccountwBalanceRes,
  AccountStatement,
  AccountwBalance,
} from '@ffdc/api_corporate-accounts/interfaces';
import { HttpClient } from '@angular/common/http';
import { Rates } from '@ffdc-corporate-banking-sample/data';
import { of } from 'rxjs';
import { map, expand, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accounts: AccountwBalance[];
  transactions$ = new Subject<AccountStatement[]>();
  currencyRates$: Observable<Rates>;

  mobileScreen = false;
  currentPage = 0;
  pageCount = 1;
  limit = 7;

  @ViewChild('accountList', { read: ElementRef })
  public accountList: ElementRef<any>;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    } else {
      this.mobileScreen = false;
    }
  }

  constructor(
    private corpAccountsGQL: CorporateAccountsGQLService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }

    this.getAllAccounts().subscribe((data) => {
      this.accounts = data;
      this.transactions$.next(
        [].concat(...this.accounts.map((account) => account.statement.items))
      );
    });

    this.getCurrencyRates();
  }

  getCurrencyRates() {
    this.currencyRates$ = this.http.get<Rates>('/rateBase?base=EUR');
  }

  getAccounts(limit: number,currentPage: number): Observable<AccountwBalanceRes> {
    return this.corpAccountsGQL.getAccounts(
      AccountType.CURRENT,
      'USD',
      limit,
      currentPage
    );
  }

  getAllAccounts(): Observable<AccountwBalance[]> {
    return this.getAccounts(this.limit, this.currentPage).pipe(
      expand((response: AccountwBalanceRes) => {
        if (response._meta.pageCount !== this.pageCount) {
          this.currentPage += response._meta.limit;
          this.pageCount++;
          return this.getAccounts(this.limit, this.currentPage);
        } else {
          return of();
        }
      }),
      reduce(
        (acc, element: AccountwBalanceRes) => acc.concat(element.items),
        []
      )
    );
  }

  public scrollRight(): void {
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }
}

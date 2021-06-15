import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CorporateAccountsGQLService } from '@ffdc-corporate-banking-sample/ui/services/corporate-accounts';
import {
  AccountType,
  AccountwBalanceRes,
  AccountStatement,
  AccountwBalance,
} from '@finastra/api_corporate-accounts/interfaces';
import { of } from 'rxjs';
import { expand, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  accounts$ = new Subject<AccountwBalance[]>();
  transactions$ = new Subject<AccountStatement[]>();
  globalBalance$ = new Subject<number>();
  equivalentCurrency = 'USD';

  mobileScreen = false;
  end = false;
  start = true;
  currentPage = 0;
  pageCount = 1;
  limit = 7;

  @ViewChild('waveSvg') waveSvg: ElementRef;

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
    private corpAccountsGQL: CorporateAccountsGQLService) {}

  ngOnInit() {
    if (window.innerWidth < 415) {
      this.mobileScreen = true;
    }

    this.getAllAccounts().subscribe((data) => {
      this.accounts$.next(data);
      this.transactions$.next(
        [].concat(...data.map((account) => account.statement.items))
      );
    });

    this.accounts$.subscribe((accounts) => {
      this.globalBalance$.next(this.getGlobalBalance(accounts));
    });

    }

  private getGlobalBalance(accounts: AccountwBalance[]): number {
    return accounts.reduce(
      (prev, current) =>
        prev + parseFloat(current.availableBalanceEquivalent.replace(/,/g, '')),
      0
    );
  }

  getAccounts(
    limit: number,
    currentPage: number
  ): Observable<AccountwBalanceRes> {
    return this.corpAccountsGQL.getAccounts(
      AccountType.CURRENT,
      this.equivalentCurrency,
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
    this.start = false;
    const scrollWidth =
      this.accountList.nativeElement.scrollWidth -
      this.accountList.nativeElement.clientWidth;

    if (scrollWidth === Math.round(this.accountList.nativeElement.scrollLeft)) {
      this.end = true;
    } else {
      this.accountList.nativeElement.scrollTo({
        left: this.accountList.nativeElement.scrollLeft + 150,
        behavior: 'smooth',
      });
    }
  }

  public scrollLeft(): void {
    this.end = false;
    if (this.accountList.nativeElement.scrollLeft === 0) {
      this.start = true;
    }
    this.accountList.nativeElement.scrollTo({
      left: this.accountList.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  ngAfterViewInit() {
    let svgGradientStop1, svgGradientStop2;
    const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/g;
    const colorsGradient = getComputedStyle(document.body)
      .getPropertyValue('--color-gradient')
      .match(rgbaRegex);

    if (!colorsGradient) {
      // Finastra's gradient
      svgGradientStop1 = `rgb(${getComputedStyle(document.body).getPropertyValue('--color-primary')})`;
      svgGradientStop2 = `rgb(${getComputedStyle(document.body).getPropertyValue('--color-secondary')})`;
    } else {
      // Gradient from theme editor
      svgGradientStop1 = colorsGradient[0];
      svgGradientStop2 = colorsGradient[1];
    }

    this.waveSvg.nativeElement.style.setProperty('--svg-gradient-stop-1', svgGradientStop1);
    this.waveSvg.nativeElement.style.setProperty('--svg-gradient-stop-2', svgGradientStop2);
  }
}

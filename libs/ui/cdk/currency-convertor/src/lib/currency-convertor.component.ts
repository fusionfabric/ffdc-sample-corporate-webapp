import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'fcbs-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencyConvertor implements OnInit {

  selectedFromCurrency = "EUR";
  selectedToCurrency = "USD";
  amountInput = "2000";

  currencyRatesObject: any;
  private _currencyRates: any

  currencyRates$: Observable<any>

  convertedAmount: string;
  convertedCurrency: string;

  fromCurrencyControl = new FormControl();
  toCurrencyControl = new FormControl();

  @Input()
  public get currencyRates(): any {
    return this._currencyRates
  }

  public set currencyRates(value: any) {
    this._currencyRates = value;
    this.currencyRatesObject=Object.keys(this._currencyRates['rates']);
  }

  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.currencyRatesObject = Object.keys(this.currencyRates['rates']);
    this.selectedFromCurrency = this.currencyRates['base'];
    this.convertAmount(this.selectedFromCurrency, this.selectedToCurrency, this.amountInput);
  }

  changeCurrencyBase(base: string) {
    return this.http.get<any>(`/rateBase?base=${base}`);
  }

  changeFromCurrencyBase(base: string) {
    this.currencyRates$ = this.changeCurrencyBase(base)
    this.currencyRates$.subscribe(currencyR => {
      this.currencyRates = currencyR;
    })
  }

  changeToCurrency(base: string) {
    this.selectedToCurrency = base;
  }

  convertAmount(fromCurrency: string, toCurrency: string, amount: string) {
    if (this.amountInput)
      this.http.get<any>(`/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`)
        .subscribe(conversion => {
          this.convertedAmount = conversion.result;
          this.convertedCurrency = toCurrency;
        });
  }

  onChangeEvent(event: any) {
    this.amountInput = event;
  }

  reverseCurrencies() {
    this.currencyRates$ = this.changeCurrencyBase(this.selectedToCurrency);
    this.currencyRates$.subscribe(currencyR => {
      this.currencyRates = currencyR;
      const tempCurrency = this.selectedFromCurrency;
      this.selectedFromCurrency = this.currencyRates['base'];
      this.selectedToCurrency = tempCurrency;
    })
  }
}


// Skeleton

@Component({
  selector: 'fcbs-currency-skeleton',
  templateUrl: './currency.skeleton.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencySkeletonComponent { }

import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {Conversion, Rates} from "@ffdc-corporate-banking-sample/data"

@Component({
  selector: 'fcbs-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencyConvertor implements OnInit {

  selectedFromCurrency = "EUR";
  selectedToCurrency = "USD";
  amountInput = "2000";

  currencyObject: string[];
  private _currencyRates: Rates

  currencyRates$: Observable<Rates>

  convertedAmount: number;
  convertedCurrency: string;

  fromCurrencyControl = new FormControl();
  toCurrencyControl = new FormControl();

  @Input()
  public get currencyRates(): Rates {
    return this._currencyRates
  }

  public set currencyRates(value: Rates) {
    this._currencyRates = value;
    this.currencyObject=Object.keys(this._currencyRates.rates);
  }

  constructor(
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.currencyObject = Object.keys(this.currencyRates.rates);
    this.selectedFromCurrency = this.currencyRates.base;
    this.convertAmount(this.selectedFromCurrency, this.selectedToCurrency, this.amountInput);
  }

  changeCurrencyBase(base: string) {
    return this.http.get<Rates>(`/rateBase?base=${base}`);
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
      this.http.get<Conversion>(`/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`)
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
      this.selectedFromCurrency = this.currencyRates.base;
      this.selectedToCurrency = tempCurrency;
      this.convertAmount(this.selectedFromCurrency,this.selectedToCurrency,this.amountInput)
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

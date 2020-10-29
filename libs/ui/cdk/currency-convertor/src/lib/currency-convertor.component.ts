import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'fcbs-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencyConvertor implements OnInit {

selectedFromCurrency = "EUR";
selectedToCurrency = "USD";

  fromCurrencyObject: any
  toCurrencyObject: any
  base: string

  fromCurrency$: Observable<any>
  toCurrency$: Observable<any>

  private _fromCurrency: any
  private _toCurrency: any

  amountInput = "2000";
  amount_1: ''
  convertedAmount: string;
  _timeout: any = null;
  fromCurrencyControl = new FormControl();
  toCurrencyControl = new FormControl();

  @Input()
  public get fromCurrency(): any {
    return this._fromCurrency
  }

  public set fromCurrency(value: any) {
    this._fromCurrency = value;
  }


  @Input()
  public get toCurrency(): any {
    return this._toCurrency
  }

  public set toCurrency(value: any) {
    this._toCurrency = value;
  }

  constructor(
    private http: HttpClient, public lc: NgZone
  ) {

  }

  ngOnInit() {
  
    console.log(this.fromCurrency);
    this.fromCurrencyObject = Object.keys(this.fromCurrency['rates']);
 
    this.base = this.fromCurrency['base'];
    this.toCurrencyObject = Object.keys(this.toCurrency['rates']);
    this.convertAmount(this.selectedFromCurrency, this.selectedToCurrency, this.amountInput);
  }

  changeFromCurrencyBase(base: string) {
    this.fromCurrency$ = this.http.get<any>(`/rateBase?base=${base}`);
    this.fromCurrency$.subscribe(x => {
      this.fromCurrency = x;
      //this.convertAmount(this.fromCurrency.base, this.selectedToCurrency, this.amountInput);
    })
  }

  changeToCurrency(base: string) {
    this.selectedToCurrency = base;
   // this.convertAmount(this.selectedFromCurrency, this.selectedToCurrency, this.amountInput);
  }


  convertAmount(fromCurrency: string, toCurrency: string, amount: string) {
    if(this.amountInput) 
    this.http.get<any>(`/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`).subscribe
    (x => {
      this.convertedAmount = x.result;
    });
  }
  onChangeEvent(event:any){
    console.log(event);
    this.amountInput=event;
  }
  
}

// Skeleton

@Component({
  selector: 'fcbs-currency-skeleton',
  templateUrl: './currency.skeleton.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencySkeletonComponent { }

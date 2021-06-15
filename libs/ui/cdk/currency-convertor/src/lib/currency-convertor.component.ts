import { Component, OnInit } from '@angular/core';
import { FxRatesService } from '@ffdc-corporate-banking-sample/ui/services/fx-rates';

@Component({
  selector: 'fcbs-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencyConvertor implements OnInit {
  currencies: string[] = ['EUR', 'USD', 'CHF', 'NZD'];

  amountInput = '2000';

  convertedAmount: string;
  convertedCurrency: string;

  fromCurrency = this.currencies[0];
  toCurrency = this.currencies[1];

  constructor(private fxRates: FxRatesService) {}

  ngOnInit() {
    this.convertAmount(this.fromCurrency, this.toCurrency, this.amountInput);
  }

  reverseCurrencies() {
    let previousCurrencies = [this.fromCurrency, this.toCurrency];
    this.fromCurrency = previousCurrencies[1];
    this.toCurrency = previousCurrencies[0];
    this.convertAmount(this.fromCurrency, this.toCurrency, this.amountInput);
  }

  convertAmount(
    selectedFromCurrency: string,
    selectedToCurrency: string,
    amountInput: string
  ) {
    if (selectedFromCurrency == selectedToCurrency) {
      this.convertedAmount = amountInput;
      this.amountInput = amountInput;
      this.convertedCurrency = selectedToCurrency;
    } else {
      this.fxRates
        .convert(selectedFromCurrency, selectedToCurrency, amountInput)
        .subscribe((conversion) => {
          this.convertedCurrency = selectedToCurrency;
          this.convertedAmount = conversion.convertedAmount;
        });
    }
  }

  onFromCurrencyChange(value: any) {
    console.log(value);
    this.fromCurrency = value;
  }

  onToCurrencyChange(value: any) {
    this.toCurrency = value;
  }

  onAmountChange(value: any) {
    this.amountInput = value;
    this.convertAmount(this.fromCurrency, this.toCurrency, this.amountInput);
  }
}

// Skeleton

@Component({
  selector: 'fcbs-currency-skeleton',
  templateUrl: './currency.skeleton.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencySkeletonComponent {}

import { Controller, Get, UseGuards, Request, Param, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) { }

  @Get('/rates')
  fxRates() {
    return this.currencyService.getFxRates();
  }

  @Get('/convert')
  convertAmount(@Query() params) {
    return this.currencyService.convertAmount(params.fromCurrency, params.toCurrency, params.amount);
  }
}

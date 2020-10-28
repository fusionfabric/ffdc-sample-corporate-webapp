import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller()
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('/rates')
  fxRates() {
    return this.currencyService.getFxRates();
  }
}

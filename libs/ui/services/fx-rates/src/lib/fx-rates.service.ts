import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import {PROXY_URL, FX_RATES_SERVICE} from '@ffdc-corporate-banking-sample/ui/core';
import {Conversion} from '@ffdc-corporate-banking-sample/data'

@Injectable({
  providedIn: 'any',
})
export class FxRatesService {
  constructor(
    private http: HttpClient,
    @Inject(PROXY_URL) protected proxyUrl: string,
    @Inject(FX_RATES_SERVICE) protected fxRates: string,
  ) {}

  convert(fromCurrency: string,
    toCurrency,
    amount: string) {
  return this.get<Conversion>(`/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`);
  }

  private get<T>(target: string) {
    return this.http.get<T>(this.proxyUrl, {
      params: {
        serviceId: this.fxRates,
        target,
      },
    });
  }
}

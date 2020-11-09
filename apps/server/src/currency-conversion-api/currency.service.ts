import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { Conversion, Rates } from '@ffdc-corporate-banking-sample/data';

@Injectable()
export class CurrencyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  getFxRates(): Observable<Rates> {
    return this.fetchApi(`latest`).pipe(map((response) => response.data));
  }

  convertAmount(
    fromCurrency: string,
    toCurrency,
    amount: string
  ): Observable<Conversion> {
    return this.fetchApi(
      `convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`
    ).pipe(map((response) => response.data));
  }

  rateBase(base: string): Observable<Rates> {
    return this.fetchApi(`latest?base=${base}`).pipe(
      map((response) => response.data)
    );
  }

  pastExchangeRates(date: string) {
    return this.fetchApi(`${date}`).pipe(map((response) => response.data));
  }

  private fetchApi(path: string) {
    const FFDC = this.configService.get('FFDC');

    return this.getToken().pipe(
      flatMap((token) =>
        this.httpService.get(`${FFDC}/fxrate/v1/${path}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    );
  }

  private getToken(
    url = this.configService.get('OIDC_TOKEN_URL'),
    client_id = this.configService.get('OIDC_CLIENT_ID_B2B'),
    client_secret = this.configService.get('OIDC_CLIENT_SECRET_B2B')
  ): Observable<any> {
    const data =
      'grant_type=client_credentials&client_id=' +
      client_id +
      '&client_secret=' +
      client_secret;

    return this.httpService
      .post(url, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(map((response) => response.data['access_token']));
  }
}

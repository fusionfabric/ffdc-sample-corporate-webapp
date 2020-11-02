import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

@Injectable()
export class CurrencyService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {}

  getFxRates(): Observable<any> {
    const FFDC = this.configService.get('FFDC');

    return this.fetchApi(
      this.configService.get('OIDC_TOKEN_URL'),
      this.configService.get('OIDC_CLIENT_ID_B2B'),
      this.configService.get('OIDC_CLIENT_SECRET_B2B')
    )
      .pipe(
        flatMap((token) =>
          this.httpService.get(`${FFDC}/fxrate/v1/latest`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      )
      .pipe(map((response) => response.data));
  }

  convertAmount(
    fromCurrency: string,
    toCurrency,
    amount: string
  ): Observable<any> {
    const FFDC = this.configService.get('FFDC');

    return this.fetchApi(
      this.configService.get('OIDC_TOKEN_URL'),
      this.configService.get('OIDC_CLIENT_ID_B2B'),
      this.configService.get('OIDC_CLIENT_SECRET_B2B')
    )
      .pipe(
        flatMap((token) =>
          this.httpService.get(
            `${FFDC}/fxrate/v1/convert?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      )
      .pipe(map((response) => response.data));
  }

  rateBase(base: string) {
    const FFDC = this.configService.get('FFDC');

    return this.fetchApi(
      this.configService.get('OIDC_TOKEN_URL'),
      this.configService.get('OIDC_CLIENT_ID_B2B'),
      this.configService.get('OIDC_CLIENT_SECRET_B2B')
    )
      .pipe(
        flatMap((token) =>
          this.httpService.get(`${FFDC}/fxrate/v1/latest?base=${base}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      )
      .pipe(map((response) => response.data));
  }

  pastExchangeRates(date: string) {
    const FFDC = this.configService.get('FFDC');

    return this.fetchApi(
      this.configService.get('OIDC_TOKEN_URL'),
      this.configService.get('OIDC_CLIENT_ID_B2B'),
      this.configService.get('OIDC_CLIENT_SECRET_B2B')
    )
      .pipe(
        flatMap((token) =>
          this.httpService.get(`${FFDC}/fxrate/v1/${date}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      )
      .pipe(map((response) => response.data));
  }

  fetchApi(url, client_id, client_secret): Observable<any> {
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

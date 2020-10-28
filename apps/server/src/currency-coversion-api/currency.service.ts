import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { flatMap, map } from 'rxjs/operators'

@Injectable()
export class CurrencyService {

  constructor(private httpService: HttpService, private configService: ConfigService) { }

  getFxRates() {
    const FFDC = this.configService.get('FFDC');
    console.log(FFDC);

    this.getToken().pipe(
      flatMap(token =>
        this.httpService.get(
          `${FFDC}/fxrate/v1/latest`,
          { headers: { 'Authorization': `Bearer ${token}` } })

      )
    ).pipe(
      map(response => response.data)).subscribe(x => console.log(x))
  }


  getToken() {
    return this.fetchApi(this.configService.get("OIDC_TOKEN_URL"),
      this.configService.get("OIDC_CLIENT_ID_B2B"), this.configService.get("OIDC_CLIENT_SECRET_B2B"));
  }


  fetchApi(url, client_id, client_secret) {
    const data = "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret;
    return this.httpService.post(
      url,
      data,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).pipe(
        map(response => response.data['access_token']),
      );
  }
}

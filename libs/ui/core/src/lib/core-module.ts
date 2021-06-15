import { NgModule } from '@angular/core';
import { PROXY_URL, CORPORATE_ACCOUNTS_SERVICE,FX_RATES_SERVICE } from './constants';

@NgModule({
  providers: [
    { provide: PROXY_URL, useValue: '/proxy' },
    { provide: CORPORATE_ACCOUNTS_SERVICE, useValue: 'CORPORATE_ACCOUNTS' },
    { provide: FX_RATES_SERVICE, useValue: 'FX_RATES' },
  ]
})
export class CoreModule {}

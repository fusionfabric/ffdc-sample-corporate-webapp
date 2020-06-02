import { NgModule } from '@angular/core';
import { PROXY_URL, CORPORATE_ACCOUNTS_SERVICE } from './constants';

@NgModule({
  providers: [
    { provide: PROXY_URL, useValue: '/proxy' },
    { provide: CORPORATE_ACCOUNTS_SERVICE, useValue: 'CORPORATE_ACCOUNTS' },
  ]
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';
import { CorporateAccountsModule } from '@ffdc-corporate-banking-sample/ui/services/corporate-accounts';
import { StatementModule } from '@ffdc-corporate-banking-sample/ui/cdk/statement';
import { CurrencyConvertorModule } from '@ffdc-corporate-banking-sample/ui/cdk/currency-convertor';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    InlineSVGModule.forRoot(),
    CorporateAccountsModule,
    StatementModule,
    CurrencyConvertorModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
})
export class HomeModule {}

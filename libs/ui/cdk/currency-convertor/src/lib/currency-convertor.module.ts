import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  PipeModule,
  SharedModule,
} from '@ffdc-corporate-banking-sample/ui/shared';
import { FxRatesModule } from '@ffdc-corporate-banking-sample/ui/services/fx-rates';

import {
  CurrencyConvertor,
  CurrencySkeletonComponent,
} from './currency-convertor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [CurrencyConvertor, CurrencySkeletonComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipeModule,
    MatTableModule,
    FxRatesModule,
  ],
  exports: [CurrencyConvertor, CurrencySkeletonComponent],
})
export class CurrencyConvertorModule {}

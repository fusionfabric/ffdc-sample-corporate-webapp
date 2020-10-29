import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';

import {
  CurrencyConvertor, CurrencySkeletonComponent
} from './currency-convertor.component';
import { AmountPipe } from './amount.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CurrencyConvertor,AmountPipe,CurrencySkeletonComponent],
  imports: [CommonModule, SharedModule,ReactiveFormsModule,
    FormsModule,HttpClientModule],
  exports: [CurrencyConvertor,CurrencySkeletonComponent],
})
export class CurrencyConvertorModule {}

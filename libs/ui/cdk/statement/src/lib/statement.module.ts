import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';

import {
  StatementComponent,
  StatementSkeletonComponent,
} from './statement.component';
import { AmountPipe } from './amount.pipe';

@NgModule({
  declarations: [StatementComponent, StatementSkeletonComponent,AmountPipe],
  imports: [CommonModule, SharedModule],
  exports: [StatementComponent, StatementSkeletonComponent],
})
export class StatementModule {}

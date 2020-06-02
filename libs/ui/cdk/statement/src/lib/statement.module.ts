import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';

import {
  StatementComponent,
  StatementSkeletonComponent,
} from './statement.component';

@NgModule({
  declarations: [StatementComponent, StatementSkeletonComponent],
  imports: [CommonModule, SharedModule],
  exports: [StatementComponent, StatementSkeletonComponent],
})
export class StatementModule {}

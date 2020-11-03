import { NgModule } from '@angular/core';
import { AmountPipe } from './amount.pipe';

@NgModule({
  declarations:[AmountPipe],
  exports: [AmountPipe],
})
export class PipeModule {}

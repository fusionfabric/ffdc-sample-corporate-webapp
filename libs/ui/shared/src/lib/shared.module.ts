import { NgModule } from '@angular/core';
import { FDSModule } from './fds.module';
import { MaterialModule } from './material.module';

@NgModule({
  exports: [FDSModule, MaterialModule],
})
export class SharedModule {}

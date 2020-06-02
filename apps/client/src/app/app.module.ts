import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';

import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';
import { CoreModule } from '@ffdc-corporate-banking-sample/ui/core'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    InlineSVGModule.forRoot(),
    GraphQLModule,
    HttpClientModule,
    CoreModule
  ],
})
export class AppModule {}

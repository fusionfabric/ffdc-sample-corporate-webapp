import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';
import { CoreModule } from '@ffdc-corporate-banking-sample/ui/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HomeModule } from 'libs/ui/features/home/src/lib/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    InlineSVGModule.forRoot(),
    GraphQLModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

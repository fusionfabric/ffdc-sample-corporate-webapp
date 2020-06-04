import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppInitRoutingModule } from './app-init.routing.module';
import {
  AuthService,
  AuthModule,
} from '@ffdc-corporate-banking-sample/ui/auth';
import { AppInitComponent } from './app-init.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [AppInitComponent],
  imports: [
    BrowserModule,
    AppInitRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => async () =>
        await authService.init(),
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppInitComponent],
})
export class AppInitModule {}

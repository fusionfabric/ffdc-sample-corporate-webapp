import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppInitRoutingModule } from './app-init.routing.module';
import { AuthService, AuthModule } from '@ffdc-corporate-banking-sample/ui/auth';
import { AppInitComponent } from './app-init.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppInitComponent],
  imports: [
    BrowserModule,
    AppInitRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
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

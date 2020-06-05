import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './constants';
import { AuthenticatedGuard } from '@ffdc-corporate-banking-sample/ui/auth';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'guest',
        loadChildren: () =>
          import('@ffdc-corporate-banking-sample/ui/features/login').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: '',
        component: AppComponent,
        children: routes,
        canLoad: [AuthenticatedGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

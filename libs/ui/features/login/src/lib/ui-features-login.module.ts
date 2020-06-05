import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@ffdc-corporate-banking-sample/ui/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LoginComponent },
    ]),
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}

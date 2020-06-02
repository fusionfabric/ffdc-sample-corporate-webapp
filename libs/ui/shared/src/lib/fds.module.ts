import { NgModule } from '@angular/core';
import { GlobalNavModule } from '@ffdc/uxg-angular-components/global-nav';
import { SkeletonTextModule } from '@ffdc/uxg-angular-components/skeleton-text';
import { UxgUserProfileMenuModule } from '@ffdc/uxg-angular-components/user-profile-menu';
import { AccountCardModule } from '@ffdc/uxg-angular-components/cards/account-card';
import { UxgTableModule } from '@ffdc/uxg-angular-components/table';

@NgModule({
  exports: [
    GlobalNavModule,
    SkeletonTextModule,
    UxgUserProfileMenuModule,
    AccountCardModule,
    UxgTableModule
  ],
})
export class FDSModule {}

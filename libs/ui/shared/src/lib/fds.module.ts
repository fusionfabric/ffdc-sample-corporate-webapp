import { NgModule } from '@angular/core';
import { GlobalNavModule } from '@finastra/angular-components/global-nav';
import { SkeletonTextModule } from '@finastra/angular-components/skeleton-text';
import { UxgUserProfileMenuModule } from '@finastra/angular-components/user-profile-menu';
import { AccountCardModule } from '@finastra/angular-components/cards/account-card';
import { UxgTableModule } from '@finastra/angular-components/table';

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

import { NgModule } from '@angular/core';
import { CorporateAccountsService } from './corporate-accounts.service';
import { CorporateAccountsGQLService } from './corporate-accounts.gql.service';

@NgModule({
  providers: [CorporateAccountsService, CorporateAccountsGQLService],
})
export class CorporateAccountsModule {}

import { AccountType } from '@ffdc/api_corporate-accounts';
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get('/all')
  test(@Req() req) {
    return this.balanceService.getAllBalances(
      req.user.authTokens.accessToken,
      AccountType.CURRENT
    );
  }
}

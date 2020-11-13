import { HttpModule, Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [HttpModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}

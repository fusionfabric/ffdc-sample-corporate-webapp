import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user')
  user(@Request() req) {
    return req.user.userinfo;
  }
}

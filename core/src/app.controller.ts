import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/check-mailchip')
  @Public()
  checkMailchimp(): Promise<any> {
    return this.appService.checkMailchimp();
  }

  @Post('/test-mailchip')
  @Public()
  testMailchimp(): Promise<any> {
    return this.appService.testMailChimp();
  }
}

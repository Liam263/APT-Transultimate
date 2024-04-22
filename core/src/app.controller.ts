import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';
import type { VercelRequest, VercelResponse } from '@vercel/node';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Public()
  hello(request: VercelRequest, response: VercelResponse): string {
    console.log("request: ", request);
    console.log("response: ", response);
    return this.appService.getHello();
  }

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

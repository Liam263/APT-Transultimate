import { InjectMailchimp } from '@mindik/mailchimp-nestjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@InjectMailchimp() private readonly mail) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkMailchimp(): Promise<any> {
    return this.mail.pingPong();
  }

  async testMailChimp(): Promise<any> {
    const message = {
      from_email: 'hello@example.com',
      subject: 'Hello world',
      text: 'Welcome to Mailchimp Transactional!',
      to: [
        {
          email: 'uyenmaxxx@gmail.com',
          type: 'to',
        },
      ],
    };

    return await this.mail.messages.send({
      message,
    });
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { jwtConstants } from './modules/auth/constants/jwtConstants';
import { UserModule } from './modules/users/user.module';
import { MailchimpModule } from '@mindik/mailchimp-nestjs';
import { DepartmentModule } from './modules/department/department.module';
import { AccreditationModule } from './modules/accreditations/accreditation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PassportModule.register({ session: true }),
    MailchimpModule.forRoot(process.env.MAILCHIP_KEY),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    DepartmentModule,
    AccreditationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

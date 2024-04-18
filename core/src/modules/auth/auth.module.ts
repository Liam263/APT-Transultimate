import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '../../passport/jwt.strategy';
import { User, UserSchema } from '../users/models/user.model';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Customer, CustomerSchema } from '../customer/models/customer.model';
import { CustomerModule } from '../customer/customer.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    CustomerModule,
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

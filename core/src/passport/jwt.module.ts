import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; 
import {  Strategy } from 'passport-jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    JwtStrategy,
    Strategy,
  ],
  exports: [JwtStrategy], 
})
export class JwtStrategyModule {}

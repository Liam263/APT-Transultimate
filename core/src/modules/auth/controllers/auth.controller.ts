import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthLoginDto } from '../dtos/auth.dtos';
import {
  CreateUserResponse,
  SigninResponse,
} from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { Public } from 'src/decorators/public.decorator';
import { UserDto } from '../../users/dtos/user.dtos';
import { Role } from '../../../enums/enum';
import { Roles } from '../../../decorators/roles.decorator';
import { ObjectId } from 'mongodb';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('signin')
  async signIn(@Body() userData: AuthLoginDto): Promise<SigninResponse> {
    // console.log(userData.email);
    return this.authService.signIn(userData);
  }

  // @Roles(Role.Customer)
  @Public()
  @Post('create')
  async create(
    @Body() userData: UserDto,
    @Req() req,
  ): Promise<CreateUserResponse> {
    console.log("Controller",userData.email)
    console.log("userData",userData)
    // const { _id: customerId } = req['user'];
    const customerId = new ObjectId()
    return this.authService.create(userData, customerId);
  }
}

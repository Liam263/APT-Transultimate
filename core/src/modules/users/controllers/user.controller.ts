import { Controller, Get } from '@nestjs/common';
import { UserToken, UserTokenType } from '../../../decorators/user.decorator';
import {
  GetUserResponse,
  GetUsersResponse,
} from '../interfaces/user.interface';
import { UserService } from '../services/user.service';
import { Role } from '../../../enums/enum';
import { Roles } from '../../../decorators/roles.decorator';
import { Public } from 'src/decorators/public.decorator';

// @Roles(Role.Customer)
@Public()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@UserToken() user: UserTokenType): Promise<GetUserResponse> {
    return this.userService.getUser(user?._id);
  }

  @Get('all')
  async getAllUsers(
    @UserToken() user: UserTokenType,
  ): Promise<GetUsersResponse> {
    return this.userService.getAllUsers(user?._id);
  }
}

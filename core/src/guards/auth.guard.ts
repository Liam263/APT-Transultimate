import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../modules/auth/constants/jwtConstants';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { Role } from '../enums/enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PriorityRole } from '../constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log("Context handler", context.getHandler());
    // console.log("Context class", context.getClass()); 

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(isPublic, "IS Public");
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // console.log(request);
    // console.log(token)
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const allowedRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      console.log('allowedRole', allowedRoles);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      console.log('current role', payload.role);

      if (
        allowedRoles &&
        !this.checkRole(allowedRoles as Role[], payload.role)
      ) {
        throw new ForbiddenException();
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch (error: any) {
      throw error;
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private checkRole(roles: Role[], userRole: Role): boolean {
    const userPriority = PriorityRole[userRole];
    return roles.find((role) => userPriority <= PriorityRole[role])
      ? true
      : false;
  }
}

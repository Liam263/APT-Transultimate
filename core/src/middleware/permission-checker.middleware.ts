import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../modules/auth/constants/jwtConstants';
// import { Types } from 'mongoose';

@Injectable()
export class PermissionCheckerMiddleware implements NestMiddleware {
  jwtService: any;
  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    req['user'] = payload;

    // const { _id } = payload;
    // const idObj = new Types.ObjectId(_id);
    // const paramIdObj = new Types.ObjectId(_id)
    // if(idObj.equals(paramIdObj)){

    // }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

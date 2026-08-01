import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { COOKIE_CONFIG } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.[COOKIE_CONFIG.SESSION_NAME] as string;

    try {
      const payload = (await this.jwtService.verifyAsync(token)) as unknown as {
        sub: string;
      };

      request['user'] = {
        id: payload.sub,
        ...request['user'],
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired access token.');
    }
    return true;
  }
}

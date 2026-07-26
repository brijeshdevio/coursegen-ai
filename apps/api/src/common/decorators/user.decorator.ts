import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export type User = {
  id: string;
};

type UserKey = keyof User;

export const User = createParamDecorator(
  (data: UserKey | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    if (!user) {
      throw new UnauthorizedException('Invalid or expired access token');
    }

    if (data) {
      return user[data];
    }

    return user;
  },
);

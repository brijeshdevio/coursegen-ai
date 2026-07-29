import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards';
import { User } from '../../common/decorators';
import { apiSuccessResponse } from '../../common/helpers';

import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getProfile(@User('id') userId: string) {
    const data = await this.userService.getProfile(userId);

    return apiSuccessResponse({ data });
  }
}

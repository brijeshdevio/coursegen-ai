import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards';
import { User } from '../../common/decorators';
import { apiSuccessResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { UserService } from './user.service';
import {
  UpdateProfileDto,
  UpdateProfileSchema,
} from './dto/update-profile.dto';
import {
  ChangePasswordDto,
  ChangePasswordSchema,
} from './dto/change-password.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getProfile(@User('id') userId: string) {
    const data = await this.userService.getProfile(userId);

    return apiSuccessResponse({ data });
  }

  @Patch('me')
  async updateProfile(
    @User('id') userId: string,
    @Body(new ValidationPipe(UpdateProfileSchema))
    body: UpdateProfileDto,
  ) {
    const data = await this.userService.updateProfile(userId, body);

    return apiSuccessResponse({
      message: 'Profile updated successfully.',
      data,
    });
  }

  @Patch('me/password')
  async changePassword(
    @User('id') userId: string,
    @Body(new ValidationPipe(ChangePasswordSchema))
    body: ChangePasswordDto,
  ) {
    await this.userService.changePassword(userId, body);

    return apiSuccessResponse({
      message: 'Password changed successfully.',
      data: null,
    });
  }
}

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
}

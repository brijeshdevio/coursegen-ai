import { Body, Controller, Post } from '@nestjs/common';

import { apiSuccessResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe(RegisterUserSchema))
    body: RegisterUserDto,
  ) {
    const data = await this.authService.register(body);

    return apiSuccessResponse({
      message: 'User registered successfully.',
      data,
    });
  }
}

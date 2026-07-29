import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { type Response } from 'express';

import {
  apiSuccessResponse,
  clearCookie,
  setCookie,
} from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';
import { COOKIE_MAX_AGE, COOKIE_NAME } from '../../common/constants';
import { JwtAuthGuard } from '../../common/guards';

import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register.dto';
import { LoginUserDto, LoginUserSchema } from './dto/login.dto';

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

  @Post('login')
  async login(
    @Body(new ValidationPipe(LoginUserSchema))
    body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, accessToken } = await this.authService.login(body);

    setCookie(res, COOKIE_NAME.ACCESS_TOKEN, accessToken, {
      maxAge: COOKIE_MAX_AGE.ACCESS_TOKEN,
    });

    return apiSuccessResponse({ message: 'Login successful.', data: user });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    clearCookie(res, COOKIE_NAME.ACCESS_TOKEN);

    return apiSuccessResponse({ message: 'Logout successful.' });
  }
}

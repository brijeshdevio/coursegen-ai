import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';

import { ValidationPipe } from '../../common/pipes';
import {
  apiSuccessResponse,
  clearAllCookies,
  setSessionCookie,
} from '../../common/helpers';
import { JwtAuthGuard } from '../../common/guards';

import { AuthService } from './auth.service';
import { SignupDto, SignupSchema } from './dto/signup.dto';
import { LoginDto, LoginSchema } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe(SignupSchema)) body: SignupDto) {
    const result = await this.authService.signup(body);
    return apiSuccessResponse({
      message: 'User signed up successfully',
      data: result,
    });
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe(LoginSchema)) body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(body);

    setSessionCookie(res, result.accessToken);

    return apiSuccessResponse({
      message: 'User logged in successfully',
      data: result.user,
    });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    clearAllCookies(res);

    return apiSuccessResponse({
      message: 'User logged out successfully',
    });
  }
}

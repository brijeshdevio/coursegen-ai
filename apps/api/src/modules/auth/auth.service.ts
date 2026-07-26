import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserResponse, RegisterUserResponse } from './auth.types';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<RegisterUserResponse> {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
      },
    });
    console.log(existingUser);

    if (existingUser) {
      throw new ConflictException('Email is already registered.');
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }

  async login(dto: LoginUserDto): Promise<LoginUserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await argon2.verify(user.password, dto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

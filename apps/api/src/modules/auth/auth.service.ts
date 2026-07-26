import { ConflictException, Injectable } from '@nestjs/common';
import argon2 from 'argon2';

import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import { RegisterUserResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

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
}

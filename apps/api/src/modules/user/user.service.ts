import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { GetProfileResponse } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: string): Promise<GetProfileResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        courses: {
          select: {
            chapters: {
              select: {
                completed: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const completedCourses = user.courses.filter((course) => {
      if (course.chapters.length === 0) {
        return false;
      }

      return course.chapters.every((chapter) => chapter.completed);
    }).length;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      totalCourses: user.courses.length,
      completedCourses,
      createdAt: user.createdAt,
    };
  }
}

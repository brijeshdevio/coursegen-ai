import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';

import { CreateCourseDto } from './dto/create-course.dto';
import { CreateCourseResponse, GetCoursesResponse } from './course.types';
import { GetCoursesQueryDto } from './dto/get-courses-query.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCourse(
    userId: string,
    dto: CreateCourseDto,
  ): Promise<CreateCourseResponse> {
    const duplicatedOrders = new Set<number>();

    for (const chapter of dto.chapters) {
      if (duplicatedOrders.has(chapter.order)) {
        throw new BadRequestException(
          `Duplicate chapter order: ${chapter.order}.`,
        );
      }

      duplicatedOrders.add(chapter.order);
    }

    const course = await this.prismaService.course.create({
      data: {
        title: dto.title,
        description: dto.description,
        topic: dto.topic,
        userId,

        chapters: {
          create: dto.chapters.map((chapter) => ({
            title: chapter.title,
            order: chapter.order,
            points: chapter.points,
          })),
        },

        resources: {
          create: dto.resources.map((resource) => ({
            title: resource.title,
            url: resource.url,
            type: resource.type,
          })),
        },
      },
      select: {
        id: true,
        title: true,
        topic: true,
        createdAt: true,
      },
    });

    return course;
  }

  async getCourses(
    userId: string,
    query: GetCoursesQueryDto,
  ): Promise<GetCoursesResponse> {
    const { page, limit, search } = query;

    const where: Prisma.CourseWhereInput = {
      userId,
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            topic: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      }),
    };

    const [total, courses] = await this.prismaService.$transaction([
      this.prismaService.course.count({
        where,
      }),

      this.prismaService.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },

        // Performance:
        // Explicit select avoids loading unnecessary chapter/resource data.
        select: {
          id: true,
          title: true,
          topic: true,
          createdAt: true,
          _count: {
            select: {
              chapters: true,
            },
          },
          chapters: {
            where: {
              completed: true,
            },
            select: {
              id: true,
            },
          },
        },
      }),
    ]);

    return {
      items: courses.map((course) => ({
        id: course.id,
        title: course.title,
        topic: course.topic,
        chaptersCount: course._count.chapters,
        completedChapters: course.chapters.length,
        createdAt: course.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

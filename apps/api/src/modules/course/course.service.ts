import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';

import { SaveCourseDto } from './dto/save-course.dto';
import {
  CourseDetailsResponse,
  CourseStatsResponse,
  CourseTopicResponse,
  GetCoursesResponse,
  SaveCourseResponse,
  ToggleTopicCompletionResponse,
} from './course.types';
import { GetCoursesQueryDto } from './dto/get-courses-query.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveCourse(
    userId: string,
    dto: SaveCourseDto,
  ): Promise<SaveCourseResponse> {
    const course = await this.prismaService.course.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        topic: dto.topic,
        level: dto.level,

        modules: {
          create: dto.modules.map((module) => ({
            title: module.title,
            order: module.order,
            topics: {
              create: module.topics.map((topic) => ({
                title: topic.title,
                order: topic.order,
              })),
            },
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
        description: true,
        topic: true,
        level: true,
        createdAt: true,
      },
    });

    return course;
  }

  async getCourses(
    userId: string,
    query: GetCoursesQueryDto,
  ): Promise<GetCoursesResponse> {
    const { page, limit, search, level } = query;

    const where: Prisma.CourseWhereInput = {
      userId,
      deletedAt: null,
      ...(level && { level }),
      ...(search && {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
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
        select: {
          id: true,
          title: true,
          description: true,
          topic: true,
          level: true,
          createdAt: true,
          modules: {
            select: {
              topics: {
                select: {
                  isCompleted: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      items: courses.map((course) => {
        const totalModules = course.modules.length;

        const totalTopics = course.modules.reduce(
          (count, module) => count + module.topics.length,
          0,
        );

        const totalCompletedTopics = course.modules.reduce(
          (count, module) =>
            count + module.topics.filter((topic) => topic.isCompleted).length,
          0,
        );

        return {
          id: course.id,
          title: course.title,
          description: course.description,
          topic: course.topic,
          level: course.level,
          totalModules,
          totalTopics,
          totalCompletedTopics,
          createdAt: course.createdAt,
        };
      }),

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getCourseById(
    userId: string,
    courseId: string,
  ): Promise<CourseDetailsResponse> {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: courseId,
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
        topic: true,
        level: true,
        createdAt: true,
        updatedAt: true,
        modules: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            title: true,
            order: true,
            topics: {
              orderBy: {
                order: 'asc',
              },
              select: {
                id: true,
                title: true,
                order: true,
                isCompleted: true,
              },
            },
          },
        },
        resources: {
          select: {
            id: true,
            title: true,
            url: true,
            type: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('No course found with this ID.');
    }

    return course;
  }

  async getCourseTopicById(
    userId: string,
    courseId: string,
    topicId: string,
  ): Promise<CourseTopicResponse> {
    const topic = await this.prismaService.topic.findFirst({
      where: {
        id: topicId,
        module: {
          courseId,
          course: {
            userId,
            deletedAt: null,
          },
        },
      },
      select: {
        id: true,
        title: true,
        order: true,
        content: true,
        isCompleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!topic) {
      throw new NotFoundException(
        'The requested topic does not exist or does not belong to this course.',
      );
    }

    return topic;
  }

  async updateTopicCompletion(
    userId: string,
    courseId: string,
    topicId: string,
  ): Promise<ToggleTopicCompletionResponse> {
    const topic = await this.prismaService.topic.findFirst({
      where: {
        id: topicId,
        module: {
          courseId,
          course: {
            userId,
            deletedAt: null,
          },
        },
      },
      select: {
        id: true,
        isCompleted: true,
      },
    });

    if (!topic) {
      throw new NotFoundException(
        'The requested topic does not exist or does not belong to this course.',
      );
    }

    return this.prismaService.topic.update({
      where: {
        id: topic.id,
      },
      data: {
        isCompleted: !topic.isCompleted,
      },
      select: {
        id: true,
        isCompleted: true,
      },
    });
  }

  async getCourseStats(userId: string): Promise<CourseStatsResponse> {
    const [totalCourses, courses] = await this.prismaService.$transaction([
      this.prismaService.course.count({
        where: {
          userId,
          deletedAt: null,
        },
      }),

      this.prismaService.course.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        select: {
          modules: {
            select: {
              topics: {
                select: {
                  isCompleted: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const totalModules = courses.reduce(
      (count, course) => count + course.modules.length,
      0,
    );

    const totalTopics = courses.reduce(
      (count, course) =>
        count +
        course.modules.reduce(
          (moduleCount, module) => moduleCount + module.topics.length,
          0,
        ),
      0,
    );

    const completedTopics = courses.reduce(
      (count, course) =>
        count +
        course.modules.reduce(
          (moduleCount, module) =>
            moduleCount +
            module.topics.filter((topic) => topic.isCompleted).length,
          0,
        ),
      0,
    );

    return {
      totalCourses,
      totalModules,
      totalTopics,
      completedTopics,
      completionRate:
        totalTopics === 0
          ? 0
          : Number(((completedTopics / totalTopics) * 100).toFixed(2)),
    };
  }

  async deleteCourse(userId: string, courseId: string): Promise<void> {
    const course = await this.prismaService.course.findFirst({
      where: {
        id: courseId,
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!course) {
      throw new NotFoundException(
        'The requested course does not exist or has already been deleted.',
      );
    }

    await this.prismaService.course.update({
      where: {
        id: course.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}

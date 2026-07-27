import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateCourseResponse } from './course.types';

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
}

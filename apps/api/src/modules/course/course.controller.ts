import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards';
import { User } from '../../common/decorators';
import { ValidationPipe } from '../../common/pipes';
import { apiSuccessResponse } from '../../common/helpers';

import { CourseService } from './course.service';
import { CreateCourseDto, CreateCourseSchema } from './dto/create-course.dto';
import {
  GetCoursesQueryDto,
  GetCoursesQuerySchema,
} from './dto/get-courses-query.dto';
import {
  UpdateChapterDto,
  UpdateChapterSchema,
} from './dto/update-chapter.dto';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('save')
  async createCourse(
    @User('id') userId: string,
    @Body(new ValidationPipe(CreateCourseSchema))
    body: CreateCourseDto,
  ) {
    const data = await this.courseService.createCourse(userId, body);

    return apiSuccessResponse({
      message: 'Course created successfully.',
      data,
    });
  }

  @Get()
  async getCourses(
    @User('id') userId: string,
    @Query(new ValidationPipe(GetCoursesQuerySchema))
    query: GetCoursesQueryDto,
  ) {
    const data = await this.courseService.getCourses(userId, query);

    return apiSuccessResponse({ data });
  }

  @Get(':id')
  async getCourse(@User('id') userId: string, @Param('id') courseId: string) {
    const data = await this.courseService.getCourse(userId, courseId);

    return apiSuccessResponse({ data });
  }

  @Delete(':id')
  async deleteCourse(
    @User('id') userId: string,
    @Param('id') courseId: string,
  ) {
    await this.courseService.deleteCourse(userId, courseId);

    return apiSuccessResponse({
      message: 'Course deleted successfully.',
      data: null,
    });
  }

  @Patch(':id/chapter/:chapterId')
  async updateChapter(
    @User('id') userId: string,
    @Param('id') courseId: string,
    @Param('chapterId') chapterId: string,
    @Body(new ValidationPipe(UpdateChapterSchema))
    body: UpdateChapterDto,
  ) {
    const data = await this.courseService.updateChapter(
      userId,
      courseId,
      chapterId,
      body,
    );

    return apiSuccessResponse({
      message: 'Chapter updated successfully.',
      data,
    });
  }
}

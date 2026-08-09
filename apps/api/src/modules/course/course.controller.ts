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

import { AiService } from '../ai/ai.service';
import { SaveCourseDto, SaveCourseSchema } from './dto/save-course.dto';
import { CourseService } from './course.service';
import {
  GenerateCourseDto,
  GenerateCourseSchema,
} from './dto/generate-course.dto';
import {
  GetCoursesQueryDto,
  GetCoursesQuerySchema,
} from './dto/get-courses-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly aiService: AiService,
  ) {}

  @Post('generate')
  async generateCourse(
    @Body(new ValidationPipe(GenerateCourseSchema))
    body: GenerateCourseDto,
  ) {
    const data = await this.aiService.generateCourse(body);

    return apiSuccessResponse({
      message: 'Course generated successfully.',
      data,
    });
  }

  @Post('save')
  async saveCourse(
    @User('id') userId: string,
    @Body(new ValidationPipe(SaveCourseSchema)) body: SaveCourseDto,
  ) {
    const data = await this.courseService.saveCourse(userId, body);

    return apiSuccessResponse({ message: 'Course saved successfully.', data });
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
  async getCourseById(
    @User('id') userId: string,
    @Param('id') courseId: string,
  ) {
    const data = await this.courseService.getCourseById(userId, courseId);

    return apiSuccessResponse({ data });
  }

  @Get(':id/topics/:topicId')
  async getCourseTopicById(
    @User('id') userId: string,
    @Param('id') courseId: string,
    @Param('topicId') topicId: string,
  ) {
    const data = await this.courseService.getCourseTopicById(
      userId,
      courseId,
      topicId,
    );

    return apiSuccessResponse({ data });
  }

  @Patch(':id/topics/:topicId/completion')
  async updateTopicCompletion(
    @User('id') userId: string,
    @Param('id') courseId: string,
    @Param('topicId') topicId: string,
  ) {
    const data = await this.courseService.updateTopicCompletion(
      userId,
      courseId,
      topicId,
    );

    return apiSuccessResponse({
      message: data.isCompleted
        ? 'Topic marked as completed successfully.'
        : 'Topic marked as incomplete successfully.',
      data,
    });
  }

  @Get('stats')
  async getCourseStats(@User('id') userId: string) {
    const data = await this.courseService.getCourseStats(userId);

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
}

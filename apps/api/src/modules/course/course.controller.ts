import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../common/guards';
import { User } from '../../common/decorators';
import { ValidationPipe } from '../../common/pipes';
import { apiSuccessResponse } from '../../common/helpers';

import { CourseService } from './course.service';
import { CreateCourseDto, CreateCourseSchema } from './dto/create-course.dto';

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
}

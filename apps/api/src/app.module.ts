import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

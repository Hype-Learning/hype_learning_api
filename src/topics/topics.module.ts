import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Course } from 'src/courses/course.entity';
import { AppConfigModule } from 'src/config/app/config.module';
import { AppConfigService } from 'src/config/app/config.service';
import { MulterModule } from '@nestjs/platform-express';
import { S3UploadsService } from 'src/common/upload-file';
import { Solution } from './solution.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Topic, Course, Solution, User]),
    MulterModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        dest: appConfigService.cloudinary,
      }),
      inject: [AppConfigService],
    }),
    AuthModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService, S3UploadsService],
})
export class TopicsModule {}

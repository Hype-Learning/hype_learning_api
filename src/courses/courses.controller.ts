import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  SetMetadata,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUser } from 'src/users/user.decorator';
import { User } from 'src/users/user.entity';
import { Topic } from 'src/topics/topic.entity';
@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @ApiResponse({ status: 201, description: 'Create a course' })
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @UseInterceptors(ClassSerializerInterceptor)
  create(
    @Body() createCourseDto: CreateCourseDto,
    @GetUser() user: User,
  ): Promise<Course> {
    return this.coursesService.create(createCourseDto, user);
  }

  @ApiResponse({ status: 200, description: 'Return all courses.' })
  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor', 'student'])
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @ApiResponse({ status: 200, description: 'Return all topics for the course' })
  @Get(':id/topics')
  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor', 'student'])
  @UseInterceptors(ClassSerializerInterceptor)
  findAllTopics(@Param('id') id: string): Promise<Topic[]> {
    return this.coursesService.findAllTopics(id);
  }

  // @UseGuards(RolesGuard)
  // @SetMetadata('roles', ['admin', 'instructor', 'student'])
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @Put(':id')
  update(@Param('id') id, @Body() courseData: CreateCourseDto) {
    return this.coursesService.update(id, courseData);
  }

  @UseGuards(AuthGuard())
  @SetMetadata('roles', ['admin', 'instructor'])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @Put(':courseId/students/:studentId')
  @UseInterceptors(ClassSerializerInterceptor)
  addStudent(
    @Param('courseId') courseId: number,
    @Param('studentId') studentId: number,
  ) {
    return this.coursesService.addStudent(courseId, studentId);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @Delete(':courseId/students/:studentId')
  @UseInterceptors(ClassSerializerInterceptor)
  removeStudent(
    @Param('courseId') courseId: number,
    @Param('studentId') studentId: number,
  ): Promise<void> {
    return this.coursesService.removeStudent(courseId, studentId);
  }
}

import {
  Controller,
  UseGuards,
  SetMetadata,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUser } from './user.decorator';
import { User } from './user.entity';
import { Course } from 'src/courses/course.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor', 'student'])
  @Get('courses')
  @UseInterceptors(ClassSerializerInterceptor)
  findAllCourses(@GetUser() user: User): Promise<Course> {
    return this.usersService.findAllCourses(user.id);
  }
}

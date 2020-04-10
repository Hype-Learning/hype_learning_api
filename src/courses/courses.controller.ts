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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(RolesGuard)
  // @SetMetadata('roles', ['admin', 'instructor'])
  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(createCourseDto);
  }

  @ApiResponse({ status: 200, description: 'Return all courses.' })
  @Get()
  @UseGuards(AuthGuard())
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  // @UseGuards(RolesGuard)
  // @SetMetadata('roles', ['admin', 'instructor', 'student'])
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.findOne(id);
  }

  @UseGuards(RolesGuard)
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
}

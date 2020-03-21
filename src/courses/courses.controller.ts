import { Controller, Post, Body, Get, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService)
    {}

    @UseGuards(AuthGuard())
    @Post()
    create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.coursesService.create(createCourseDto);
    }

    @ApiResponse({ status: 200, description: 'Return all articles.'})
    @Get()
    findAll(): Promise<Course[]> {
        return this.coursesService.findAll();
    }

    @UseGuards(AuthGuard())
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Course> {
        return this.coursesService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    update(@Param('id') id, @Body() courseData: CreateCourseDto){
        return this.coursesService.update(id, courseData);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.coursesService.remove(id);
    }
}

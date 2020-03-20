import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.entity';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService)
    {}

    @Post()
    create(@Body('course') createCourseDto: CreateCourseDto): Promise<Course> {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    findAll(): Promise<Course[]> {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Course> {
        return this.coursesService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body('course') courseData: CreateCourseDto){
        return this.coursesService.update(id, courseData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.coursesService.remove(id);
    }
}

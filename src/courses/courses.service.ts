import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly coursesRepository: Repository<Course>,
    ) {}
    
    create(createCourseDto: CreateCourseDto): Promise<Course> {
        const course = new Course();
        course.title = createCourseDto.title;
        course.description = createCourseDto.description;
        course.announcement = createCourseDto.announcement;

        return this.coursesRepository.save(course);
    }
    
    async findAll(): Promise<Course[]> {
        return this.coursesRepository.find();
    }

    findOne(id: string): Promise<Course> {
        return this.coursesRepository.findOne(id);
    }

    async update(id: string, courseData: any): Promise<Course> {
        const toUpdate = await this.coursesRepository.findOne(id);
        const updated = Object.assign(toUpdate, courseData);
        const course = await this.coursesRepository.save(updated);
        return course;
    }

    async remove(id: string): Promise<void> {
        await this.coursesRepository.delete(id);
    }
    
}

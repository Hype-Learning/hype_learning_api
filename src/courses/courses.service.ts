import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/users/user.entity';
import { Topic } from 'src/topics/topic.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCourseDto: CreateCourseDto, user: User): Promise<Course> {
    const course = new Course();
    course.title = createCourseDto.title;
    course.description = createCourseDto.description;
    course.announcement = createCourseDto.announcement;
    // course.author = user;

    const newCourse = await this.coursesRepository.save(course);
    const creator = await this.userRepository.findOne({
      where: { id: user.id },
      relations: ['courses'],
    });
    creator.courses.push(course);
    await this.userRepository.save(creator);

    return newCourse;
  }

  async findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async findAllTopics(id: string): Promise<Topic[]> {
    const course = await this.coursesRepository.findOne(id);
    const topics = course.topics;

    return topics;
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

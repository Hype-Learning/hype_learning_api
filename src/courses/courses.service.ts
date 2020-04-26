import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository, createQueryBuilder } from 'typeorm';
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
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
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
    const topics = await this.topicsRepository.find({
      relations: ['course'],
      where: { courseId: id },
    });

    return topics;
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.coursesRepository.findOne(id);
    if (course === undefined) {
      throw new HttpException('Not Found', 404);
    } else return course;
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

  async addStudent(courseId: number, studentId: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['participants'],
    });
    const student = await this.userRepository.findOne(studentId);

    const participants = await course.participants;
    const studentExists = participants.find(
      student => (student.id = studentId),
    );
    if (studentExists) {
      return course;
    } else {
      participants.push(student);
      const updatedCourse = await this.coursesRepository.save(course);
      return updatedCourse;
    }
  }

  async removeStudent(courseId: number, studentId: number): Promise<void> {
    const course = await this.coursesRepository.findOne({
      where: { id: courseId },
      relations: ['participants'],
    });

    const studentExists = course.participants.find(
      student => student.id == studentId,
    );

    if (studentExists) {
      const updatedParticipants = course.participants.filter(
        student => student.id != studentId,
      );

      course.participants = updatedParticipants;
      await this.coursesRepository.save(course);
    } else {
      return;
    }
  }
}

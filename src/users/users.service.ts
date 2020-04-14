import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Course } from 'src/courses/course.entity';
import { classToPlain } from 'class-transformer';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  public async findById(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async update(id: number, newValue: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
    }
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async delete(id: number): Promise<DeleteResult> {
    await this.userRepository.delete(id);
    return new DeleteResult();
  }

  public async register(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async findAllCourses(id: number): Promise<any> {
    const studentCourses = [];
    const courses = await this.coursesRepository.find({
      relations: ['participants'],
      select: ['id', 'title'],
    });

    courses.forEach(course => {
      const participants = course.participants;
      if (participants.find(student => student.id == id)) {
        delete course.participants;
        studentCourses.push(course);
      }
    });

    return studentCourses;
  }
}

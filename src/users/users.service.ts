import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Course } from 'src/courses/course.entity';
import { S3UploadsService } from 'src/common/upload-file';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly uploadFileService: S3UploadsService,
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

  public async update(
    user: User,
    newValue: UpdateUserDto,
    file: any,
  ): Promise<User> {
    if (!user) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
      return;
    }

    // newValue.email ? (user.email = newValue.email) : (user.email = user.email);
    // newValue.password
    //   ? (user.password = newValue.password)
    //   : (user.password = user.password);

    console.log(newValue.email);
    console.log('xD');

    if (file) {
      const fileUrl = await this.uploadFileService.uploadFile(file);
      user.fileUrl = process.env.AWS_URL + fileUrl;
      await this.userRepository.update(user.id, user);
    }

    if (newValue.email || newValue.password) {
      user.email = newValue.email || user.email;
      user.password = newValue.password || user.password;
      await this.userRepository.update(user.id, {
        email: user.email,
        password: (
          await this.userRepository.hashPassword(user.password, user.salt)
        ).toString(),
      });
    }

    return await this.userRepository.findOne(user.id);
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
    user.fileUrl = '';
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

  async changeStatus(id: number) {
    const user = await this.userRepository.findOne(id);
    user.isBlocked = !user.isBlocked;

    return this.userRepository.save(user);
  }

  async changeRole(id: number, role: string) {
    const user = await this.userRepository.findOne(id);
    if (
      (role == 'inactive' ||
        role == 'student' ||
        role == 'instructor' ||
        role == 'admin') &&
      user.role == 'inactive'
    )
      user.role = role;

    return this.userRepository.save(user);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Repository } from 'typeorm';
import { CreateTopicDto } from 'src/topics/dto/create-topic.dto';
import { Course } from 'src/courses/course.entity';
import { S3UploadsService } from 'src/common/upload-file';
import { Solution } from './solution.entity';
import { User } from 'src/users/user.entity';
@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    @InjectRepository(Solution)
    private readonly solutionsRepository: Repository<Solution>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<Solution>,
    private readonly uploadFileService: S3UploadsService,
  ) {}

  async create(createTopicDto: CreateTopicDto, file: any): Promise<Topic> {
    const topic = new Topic();
    topic.title = createTopicDto.title;
    topic.description = createTopicDto.description;
    if (file) {
      const fileUrl = await this.uploadFileService.uploadFile(file);
      topic.fileUrl = process.env.AWS_URL + fileUrl;
    } else {
      topic.fileUrl = '';
    }

    // console.log(file);
    const course = await this.coursesRepository.findOne({
      where: { id: createTopicDto.courseId },
      relations: ['topics'],
    });
    topic.course = course;
    course.topics.push(topic);
    await this.coursesRepository.save(course);
    const newTopic = await this.topicsRepository.save(topic);

    return newTopic;
  }

  async update(id: string, topicData: any, file: any): Promise<Topic> {
    const topic = await this.topicsRepository.findOne(id);
    // if (file) {
    //   const fileUrl = await this.uploadFileService.uploadFile(file);
    //   topicData.fileUrl = process.env.AWS_URL + fileUrl;
    // } else {
    //   topicData.fileUrl = '';
    // }
    // const updated = Object.assign(toUpdate, topicData);
    // const topic = await this.topicsRepository.save(updated);
    // return topic;

    if (file) {
      const fileUrl = await this.uploadFileService.uploadFile(file);
      topic.fileUrl = process.env.AWS_URL + fileUrl;
      await this.topicsRepository.update(topic.id, topic);
    }

    if (topicData.title != '') {
      topic.title = topicData.title;
      await this.topicsRepository.update(topic.id, topic);
    }

    if (topicData.description != '') {
      topic.description = topicData.description;
      await this.topicsRepository.update(topic.id, topic);
    }

    return await this.topicsRepository.findOne(topic.id);
  }

  async remove(id: string): Promise<void> {
    await this.topicsRepository.delete(id);
  }

  async addSolution(id: number, user: User, file: any): Promise<Solution> {
    const topic = await this.topicsRepository.findOne(id);
    const solution = new Solution();
    solution.topic = topic;
    solution.student = user;

    if (file) {
      const fileUrl = await this.uploadFileService.uploadFile(file);
      solution.fileUrl = process.env.AWS_URL + fileUrl;
    } else {
      solution.fileUrl = '';
    }

    const createdSolution = await this.solutionsRepository.save(solution);

    return createdSolution;
  }

  async findAllSolutions(id: string): Promise<Solution[]> {
    const solutions = await this.solutionsRepository.find({
      relations: ['topic'],
      where: { topicId: id },
    });

    return solutions;
  }
}

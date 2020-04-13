import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Repository, getRepository } from 'typeorm';
import { CreateTopicDto } from 'src/topics/dto/create-topic.dto';
import { Course } from 'src/courses/course.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = new Topic();
    topic.title = createTopicDto.title;
    topic.description = createTopicDto.description;

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

  async update(id: string, topicData: any): Promise<Topic> {
    const toUpdate = await this.topicsRepository.findOne(id);
    const updated = Object.assign(toUpdate, topicData);
    const topic = await this.topicsRepository.save(updated);
    return topic;
  }

  async remove(id: string): Promise<void> {
    await this.topicsRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { Topic } from 'src/topics/topic.entity';
import { User } from 'src/users/user.entity';
import { Quiz } from './quiz.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question } from './question.entity';
import { isNullOrUndefined } from 'util';
import { SolveQuizDto } from './dto/solve-quiz.dto';
import { Result } from './result.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizzesRepository: Repository<Quiz>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Topic)
    private readonly topicsRepository: Repository<Topic>,
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(Result)
    private readonly resultsRepository: Repository<Result>,
  ) {}

  async create(
    topicId: number,
    createQuizDto: CreateQuizDto,
    user: User,
  ): Promise<Quiz> {
    const topic = await this.topicsRepository.findOne(topicId, {
      relations: ['course', 'quiz'],
    });
    const instructor = await this.userRepository.findOne(user.id, {
      relations: ['courses'],
    });
    let isEmpty = false;
    let isAuthor = false;
    if (isNullOrUndefined(topic.quiz)) {
      isEmpty = true;
    }

    instructor.courses.forEach(course => {
      if (isAuthor == false && course.id == topic.course.id) {
        isAuthor = true;
      }
    });

    if (!(isEmpty && isAuthor)) {
      return new Quiz();
    }
    const quiz = new Quiz();
    quiz.title = createQuizDto.title;
    const newQuiz = await this.quizzesRepository.save(quiz);
    const xd = await this.quizzesRepository.findOne({
      relations: ['questions'],
      where: { id: newQuiz.id },
    });
    createQuizDto.questions.forEach(async question => {
      const newQuestion = Object.assign(new Question(), {
        title: question.text,
        a: question.answers[0],
        b: question.answers[1],
        c: question.answers[2],
        d: question.answers[3],
        correct: question.correctAnswer,
        quiz: newQuiz,
      });
      const createdQuestion = await this.questionsRepository.save(newQuestion);
      xd.questions.push(createdQuestion);
    });
    const createdQuiz = await this.quizzesRepository.save(newQuiz);
    const topicToUpdate = await this.topicsRepository.findOne(topicId, {
      relations: ['quiz'],
    });
    topicToUpdate.quiz = createdQuiz;
    await this.topicsRepository.save(topicToUpdate);
    return createdQuiz;
  }

  async remove(id: number) {
    const toRemove = await this.quizzesRepository.findOne(id);
    const topic = await this.topicsRepository.findOne({
      where: { quiz: toRemove },
    });
    topic.quiz = null;
    await this.topicsRepository.save(topic);
    await this.quizzesRepository.delete(id);
  }

  async findOne(topicId: number) {
    const topic = await this.topicsRepository.findOne(topicId, {
      relations: ['quiz'],
    });
    const quiz = await this.quizzesRepository.findOne(topic.quiz.id, {
      relations: ['questions'],
    });

    return quiz;
  }

  async update(id: string, quizData: any): Promise<Quiz> {
    const toUpdate = await this.quizzesRepository.findOne(id);
    const updated = Object.assign(toUpdate, quizData);
    const quiz = await this.quizzesRepository.save(updated);
    return quiz;
  }

  async solveQuiz(id: number, solveQuizDto: SolveQuizDto, user: User) {
    const quiz = await this.quizzesRepository.findOne(id, {
      relations: ['questions'],
    });

    const student = await this.userRepository.findOne(user.id, {
      relations: ['results'],
    });

    const questions = quiz.questions;
    let score = 0;
    const count = questions.length;

    for (let i = 0; i < count; i++) {
      if (questions[i].correct == solveQuizDto.answers[i]) score++;
    }

    const total = score / count;
    const result = new Result();
    result.quiz = quiz;
    result.user = user;
    result.score = total;
    await this.resultsRepository.save(result);
    student.results.push(result);
    await this.userRepository.save(student);
    return total * 100;
  }
}

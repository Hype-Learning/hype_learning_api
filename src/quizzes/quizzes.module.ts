import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Quiz } from './quiz.entity';
import { UserRepository } from 'src/users/user.repository';
import { Topic } from 'src/topics/topic.entity';
import { Question } from './question.entity';
import { Result } from './result.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Quiz, Topic, UserRepository, Question, Result]),
    AuthModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}

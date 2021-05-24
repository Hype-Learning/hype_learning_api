import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsString, MaxLength, IsNotEmpty, IsDecimal } from 'class-validator';
import { Question } from './question.entity';
import { User } from 'src/users/user.entity';
import { Quiz } from './quiz.entity';
@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'real' })
  score: number;

  @ManyToOne(
    type => User,
    user => user.results,
  )
  user: User;

  @ManyToOne(
    type => Quiz,
    quiz => quiz.results,
  )
  quiz: Quiz;
}

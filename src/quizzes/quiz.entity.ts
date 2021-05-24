import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Question } from './question.entity';
import { Result } from './result.entity';
@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @OneToMany(
    type => Question,
    question => question.quiz,
  )
  questions: Question[];

  @OneToMany(
    type => Result,
    result => result.quiz,
  )
  results: Result[];
}

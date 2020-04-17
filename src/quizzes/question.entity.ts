import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Quiz } from './quiz.entity';
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  a: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  b: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  c: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  d: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  correct: string;

  @ManyToOne(
    type => Quiz,
    quiz => quiz.questions,
  )
  quiz: Quiz;
}

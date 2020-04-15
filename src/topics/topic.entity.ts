import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';
import { Course } from 'src/courses/course.entity';
import { Exclude } from 'class-transformer';
import { Solution } from './solution.entity';
@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @Column({ nullable: true })
  @IsOptional()
  @MaxLength(1000)
  fileUrl: string;

  @Exclude()
  @ManyToOne(
    type => Course,
    course => course.topics,
  )
  course: Course;

  @Exclude()
  @OneToMany(
    type => Solution,
    solution => solution.topic,
  )
  solutions: Solution[];
}

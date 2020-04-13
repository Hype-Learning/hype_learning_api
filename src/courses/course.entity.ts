import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Topic } from 'src/topics/topic.entity';
import { Instructor } from 'src/users/instructor.entity';
import { Student } from 'src/users/student.entity';
@Entity()
export class Course {
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

  @Column()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10000)
  announcement: string;

  @ManyToOne(
    type => Instructor,
    instructor => instructor.courses,
  )
  author: Instructor;

  @ManyToMany(
    type => Student,
    student => student.courses
  )
  participants: Student[];

  @OneToMany(
    type => Topic,
    topic => topic.course,
  )
  topics: Topic[];

  //list of topics

  //instructor
  //students
  //semester
}

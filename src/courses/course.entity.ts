import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Topic } from 'src/topics/topic.entity';
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
    type => User,
    user => user.courses,
  )
  author: User;

  @OneToMany(
    type => Topic,
    topic => topic.course,
  )
  topics: Topic[];

  @ManyToMany(type => User)
  @JoinTable()
  participants: User[];
}

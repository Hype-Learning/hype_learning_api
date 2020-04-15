import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { Topic } from './topic.entity';
@Entity()
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  @MaxLength(1000)
  fileUrl: string;

  @Exclude()
  @OneToOne(type => User)
  @JoinColumn()
  student: User;

  @Exclude()
  @ManyToOne(
    type => Topic,
    topic => topic.solutions,
  )
  topic: Topic;
}

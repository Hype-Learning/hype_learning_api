/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/course.entity';
import { Result } from 'src/quizzes/result.entity';
import { Solution } from 'src/topics/solution.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column()
  @ApiProperty()
  role: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  isBlocked: boolean;

  @Column({ nullable: true })
  @ApiProperty()
  fileUrl: string;

  @OneToMany(
    type => Course,
    course => course.author,
  )
  courses: Course[];

  @OneToMany(
    type => Result,
    result => result.user,
  )
  results: Result[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

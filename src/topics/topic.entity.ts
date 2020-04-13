import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { Course } from 'src/courses/course.entity';
import { Exclude } from 'class-transformer';
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

  @Exclude()
  @ManyToOne(
    type => Course,
    course => course.topics,
  )
  course: Course;
}

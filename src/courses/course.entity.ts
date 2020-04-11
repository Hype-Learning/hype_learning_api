import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { User } from 'src/users/user.entity';
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

  //list of topics

  //instructor
  //students
  //semester
}

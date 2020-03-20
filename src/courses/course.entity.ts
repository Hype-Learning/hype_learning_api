import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, MaxLength, IsNotEmpty } from "class-validator";
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

    //list of topics

    //instructor
    //students
    //semester
}
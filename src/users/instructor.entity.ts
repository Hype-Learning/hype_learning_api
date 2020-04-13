import { User } from "./user.entity";
import { OneToMany, Entity } from "typeorm";
import { Course } from "src/courses/course.entity";

@Entity()
export class Instructor extends User {

    @OneToMany(
        type => Course,
        course => course.author,
    )
    courses: Course[];
}
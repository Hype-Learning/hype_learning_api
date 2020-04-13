import { User } from "./user.entity";
import { Course } from "src/courses/course.entity";
import { ManyToMany, JoinTable, Entity } from "typeorm";

@Entity()
export class Student extends User {

    @ManyToMany(type => Course, { cascade: false })
    @JoinTable({
        name: 'student_courses',
        joinColumn: { name: 'student_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' }
    })
    courses: Course[];
}
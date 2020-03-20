/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { IsNotEmpty, IsEmail } from "class-validator";
import * as bcrypt from 'bcrypt';
import { UserRO } from "./user.ro";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toResponseObject(showToken: boolean = true): UserRO {
        const { id, email } = this;
        const responseObject: UserRO = {
          id,
          email,
        };
    
        return responseObject;
      }
}
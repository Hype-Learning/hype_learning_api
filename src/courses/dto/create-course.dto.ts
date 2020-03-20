import { IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    readonly title: string;
    @IsString()
    readonly description: string;
    @IsString()
    readonly announcement: string;
}
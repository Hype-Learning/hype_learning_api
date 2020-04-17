import { IsString, IsArray } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizDto {
  @IsString()
  readonly title: string;
  @IsArray()
  readonly questions: CreateQuestionDto[];
}

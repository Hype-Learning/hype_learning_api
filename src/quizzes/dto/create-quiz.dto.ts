import { IsString } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  readonly title: string;
}

import { IsString } from 'class-validator';

export class EditQuizDto {
  @IsString()
  readonly title: string;
}

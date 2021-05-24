import { IsArray } from 'class-validator';

export class SolveQuizDto {
  @IsArray()
  readonly answers: string[];
}

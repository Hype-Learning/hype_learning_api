export class CreateQuestionDto {
  readonly id: number;
  readonly text: string;
  readonly answers: string[];
  readonly correctAnswer: string;
}

import { IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;

  readonly courseId: string;
}

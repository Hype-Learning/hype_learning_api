import {
  Controller,
  Post,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  Body,
  ClassSerializerInterceptor,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/users/user.decorator';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiResponse({ status: 201, description: 'Create a quiz' })
  @Post(':topicId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @UseInterceptors(ClassSerializerInterceptor)
  create(
    @Param('topicId') topicId,
    @Body() createQuizDto: CreateQuizDto,
    @GetUser() user: User,
  ): Promise<Quiz> {
    return this.quizzesService.create(topicId, createQuizDto, user);
  }
}

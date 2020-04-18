import {
  Controller,
  Post,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  Body,
  ClassSerializerInterceptor,
  Param,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Quiz } from './quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { User } from 'src/users/user.entity';
import { GetUser } from 'src/users/user.decorator';
import { EditQuizDto } from './dto/edit-quiz.dto';
import { SolveQuizDto } from './dto/solve-quiz.dto';

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

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor', 'student'])
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Quiz> {
    return this.quizzesService.findOne(id);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @Put(':id')
  update(@Param('id') id, @Body() quizData: EditQuizDto) {
    return this.quizzesService.update(id, quizData);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.quizzesService.remove(id);
  }

  @Post('solve/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['student'])
  @UseInterceptors(ClassSerializerInterceptor)
  solveQuiz(
    @Param('id') id,
    @Body() solveQuizDto: SolveQuizDto,
    @GetUser() user: User,
  ) {
    return this.quizzesService.solveQuiz(id, solveQuizDto, user);
  }
}

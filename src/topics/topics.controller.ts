import {
  Controller,
  Post,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Put,
  Get,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TopicsService } from './topics.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Topic } from './topic.entity';
import { CreateTopicDto } from 'src/topics/dto/create-topic.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @ApiResponse({ status: 201, description: 'Create a topic' })
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createTopicDto: CreateTopicDto,
    @UploadedFile() file,
  ): Promise<Topic> {
    return this.topicsService.create(createTopicDto, file);
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @SetMetadata('roles', ['admin', 'instructor'])
  @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  update(
    @UploadedFile() file,
    @Param('id') id,
    @Body() topicData: CreateTopicDto,
  ) {
    return this.topicsService.update(id, topicData, file);
  }

  @UseGuards(AuthGuard())
  @SetMetadata('roles', ['admin', 'instructor'])
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.topicsService.remove(id);
  }
}

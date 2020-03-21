import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register( { defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Course])],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {
}

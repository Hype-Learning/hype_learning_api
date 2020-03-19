import { Module } from '@nestjs/common';
import { AuthzModule } from './authz/authz.module';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';



@Module({
  imports: [
    AuthzModule, 
    ConfigModule.forRoot(), CoursesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

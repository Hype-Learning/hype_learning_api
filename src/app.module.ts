import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from './courses/courses.module';
import { AppConfigModule } from './config/app/config.module';
import { DbConfigModule } from './config/database/config.module';
import { DbConfigService } from './config/database/config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TopicsModule } from './topics/topics.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import * as ormconfig from './ormconfig';

export function DatabaseOrmModule(): DynamicModule {
  // we could load the configuration from dotEnv here,
  // but typeORM cli would not be able to find the configuration file.

  return TypeOrmModule.forRoot(ormconfig);
}

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AppConfigModule,
    DbConfigModule,
    AuthModule,
    UsersModule,
    CoursesModule,
    TopicsModule,
    QuizzesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dbConfigService: DbConfigService) {
    console.log(dbConfigService.username);
  }
}

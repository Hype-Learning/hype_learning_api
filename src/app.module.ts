import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesModule } from './courses/courses.module';
import { AppConfigModule } from './config/app/config.module';
import { DbConfigModule } from "./config/database/config.module";
import { DbConfigService } from './config/database/config.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DbConfigModule],
      useFactory: (dbConfigService: DbConfigService) => ({
        type: 'postgres',
        host: dbConfigService.host,
        port: dbConfigService.port,
        username: dbConfigService.username,
        password: dbConfigService.password,
        database: dbConfigService.database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: dbConfigService.synchronize,
      }),
      inject: [DbConfigService]
    }),
    AppConfigModule,
    DbConfigModule,
    AuthModule,
    UsersModule,
    CoursesModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dbConfigService2: DbConfigService){
    console.log(dbConfigService2.username);
  }
}

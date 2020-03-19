import { Module } from '@nestjs/common';
import { AuthzModule } from './authz/authz.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    AuthzModule, 
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

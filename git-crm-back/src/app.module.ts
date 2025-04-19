import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_STRING ||
        'mongodb://localhost:27017/git-crm',
    ),
    AuthModule,
    UserModule,
    ProjectModule,
  ],
})
export class AppModule {}

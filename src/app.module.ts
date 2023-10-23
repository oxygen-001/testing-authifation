import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connection } from './config/connection';
import { Users } from './entities/users.entity';
import { Todos } from './entities/todos.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres' as any,
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'test',
      entities: [Users, Todos],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

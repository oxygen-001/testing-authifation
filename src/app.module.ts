import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Todos } from './entities/todos.entity';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    AuthModule,
    TodoModule,
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

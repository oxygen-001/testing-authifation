import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from '../auth/constants';
import { Todos } from '../entities/todos.entity';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './service/todo.service';
import { Users } from '../entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todos, Users]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],

  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

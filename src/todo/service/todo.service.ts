import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ForToken } from '../../auth/service/service.types';
import { Todos } from '../../entities/todos.entity';
import { Repository } from 'typeorm';
import { ToServiceGetTodos } from './todo.service.type';
import { Users } from '../../entities/users.entity';
import { TodoInfo } from '../dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todos)
    @InjectRepository(Users)
    private TodoRepository: Repository<Todos>,
    private UserRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async todos(token: ForToken): Promise<ToServiceGetTodos> {
    if (!token.authorization) {
      return {
        status: 400,
        json: { message: 'You must give the token', data: null },
      };
    }

    const clearlyToken: string = token.authorization.slice(
      7,
      token.authorization.length,
    );

    const decodedToken = await this.jwtService.decode(clearlyToken);

    if (!decodedToken) {
      return {
        status: 400,
        json: { message: 'invalid token', data: null },
      };
    }

    return {
      status: 200,
      json: { message: 'successfully', data: await this.TodoRepository.find() },
    };
  }

  async addTodo(
    token: ForToken,
    body: TodoInfo,
    file: Express.Multer.File,
  ): Promise<ToServiceGetTodos> {
    if (!token.authorization) {
      return {
        status: 400,
        json: { message: 'You must give the token', data: null },
      };
    }

    const clearlyToken: string = token.authorization.slice(
      7,
      token.authorization.length,
    );

    const decodedToken = await this.jwtService.decode(clearlyToken);

    if (!decodedToken) {
      return {
        status: 400,
        json: { message: 'invalid token', data: null },
      };
    }

    const findUser = await this.UserRepository.findOneBy({
      id: (decodedToken as any).id,
    });

    if (!findUser) {
      return {
        status: 404,
        json: { data: null, message: 'user is not found' },
      };
    }

    const newTodo: TodoInfo = {
      text: body.text,
      title: body.title,
      isCompleted: body.isCompleted,
      photo: file.filename,
    };

    const saveTodo = await this.TodoRepository.save(newTodo);

    findUser.todos = [saveTodo];
    await this.UserRepository.save(findUser);

    return {
      status: 201,
      json: { message: 'successfully', data: saveTodo },
    };
  }
}

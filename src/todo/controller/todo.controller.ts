import {
  Body,
  Controller,
  Get,
  Headers,
  Res,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TodoService } from '../service/todo.service';
import { ForToken } from 'src/auth/service/service.types';
import { Response } from 'express';
import { TodoInfo } from '../dto/todo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Todo')
@ApiBearerAuth()
@Controller('/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async todos(@Headers() token: ForToken, @Res() response: Response) {
    const responseOfTodos = await this.todoService.todos(token);
    return response.status(responseOfTodos.status).json(responseOfTodos.json);
  }

  @Post('add')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const uniqueSuffix =
            Date.now() + Math.round(Math.random() * 1e9) + '_';
          const filename = `${uniqueSuffix}__${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addTodo(
    @Headers() token: ForToken,
    @Body() body: TodoInfo,
    @Res() response: Response,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response<any, Record<string, any>>> {
    const responseOfNewTodo = await this.todoService.addTodo(token, body, file);
    return response
      .status(responseOfNewTodo.status)
      .json(responseOfNewTodo.json);
  }
}

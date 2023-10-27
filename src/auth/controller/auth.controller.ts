import { Controller, Get, Headers, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { UserInfo } from '../dto/auth.dto';
import { ForToken } from '../service/service.types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUsers(@Headers() token: ForToken, @Res() response: Response) {
    const responseOfUsers = await this.authService.getUsers(token, response);
    return response.status(responseOfUsers.status).json(responseOfUsers.json);
  }

  @Post('signup')
  async signUp(@Body() body: UserInfo, @Res() response: Response) {
    const responseOfUsers = await this.authService.signUp(body);
    return response.status(responseOfUsers.status).json(responseOfUsers.json);
  }

  @Post('signin')
  async signIn(@Body() body: UserInfo, @Res() response: Response) {
    const responseOfUsers = await this.authService.signIn(body);
    return response.status(responseOfUsers.status).json(responseOfUsers.json);
  }
}

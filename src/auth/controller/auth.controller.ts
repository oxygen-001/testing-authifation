import {
  Controller,
  Get,
  Res,
  Headers,
  Post,
  Response,
  Body,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response as ResponseExpress } from 'express';
import { ToGetUsers, UserInfo } from '../service/service.types';

@Controller('/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getUsers(@Headers() token: string): Promise<ToGetUsers[]> {
    return this.authService.getUsers(token);
  }

  @Post('signup')
  signUp(@Body() body: UserInfo) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body: UserInfo) {
    return this.authService.singIn(body);
  }
}

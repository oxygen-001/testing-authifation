import { Controller, Get, Headers, Post, Body, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { ForToken, UserInfo } from '../dto/auth.dto';

@Controller('/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUsers(@Headers() token: string, @Res() response: Response) {
    return response.send(await this.authService.getUsers(token, response));
  }

  @Post('signup')
  signUp(@Body() body: UserInfo) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body: UserInfo) {
    return this.authService.signIn(body);
  }
}

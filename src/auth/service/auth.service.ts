import { Injectable } from '@nestjs/common';
import { ToGetUsers, UserInfo } from './service.types';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ForToken } from '../dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async getUsers(token: string, response: Response): Promise<ToGetUsers[]> {
    try {
      return await this.UserRepository.find();
    } catch (error: any) {
      console.log(error);
    }
  }

  async signUp(body: UserInfo) {
    try {
      const newUser = this.UserRepository.create(body);

      await this.UserRepository.save(newUser);
      return newUser;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async signIn(body: UserInfo) {
    try {
      const findUser = await this.UserRepository.findOneBy({
        username: body.username,
      });

      if (!findUser) {
        return 'user is not found';
      }

      if (findUser.password !== body.password) {
        return 'invalid username or password';
      }

      return findUser;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

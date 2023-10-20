import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ToGetUsers, UserInfo } from './service.types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
  ) {}

  async getUsers(token: string): Promise<ToGetUsers[]> {
    try {
      return await this.UserRepository.find();
    } catch (error: any) {
      console.log(error);
    }
  }

  async signUp(body: UserInfo) {
    try {
      const newUser = await this.UserRepository.create(body);

      await this.UserRepository.save(newUser);
      return newUser;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async singIn(body: UserInfo) {
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

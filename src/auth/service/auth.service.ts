import { Injectable } from '@nestjs/common';
import { ForToken, ToServiceGetusers, UserInfo } from './service.types';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../../entities/users.entity';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private UserRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async getUsers(
    token: ForToken,
    response: Response,
  ): Promise<ToServiceGetusers> {
    try {
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

      const decoded = this.jwtService.decode(clearlyToken);

      if (!decoded) {
        return {
          status: 400,
          json: { message: 'invalid token', data: null },
        };
      }

      return {
        status: 200,
        json: {
          message: 'successfully',
          data: await this.UserRepository.find(),
        },
      };
    } catch (error: any) {
      console.log(error);
    }
  }

  async signUp(body: UserInfo): Promise<ToServiceGetusers> {
    try {
      const findUser = await this.UserRepository.findOneBy({
        username: body.username,
      });

      if (findUser) {
        return {
          status: 400,
          json: { message: 'user is already exist', data: null },
        };
      }

      const toHash = bcrypt.hashSync(body.password, 10);

      const newUser = await this.UserRepository.save({
        username: body.username,
        password: toHash,
      });

      const token = this.jwtService.sign({ id: newUser.id });

      return {
        status: 200,
        json: {
          message: 'successfully',
          data: {
            username: body.username,
            password: toHash,
            id: newUser.id,
            token,
          },
        },
      };
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async signIn(body: UserInfo): Promise<ToServiceGetusers> {
    try {
      const findUser = await this.UserRepository.findOneBy({
        username: body.username,
      });

      if (!findUser) {
        return {
          status: 404,
          json: { message: 'user is not found', data: null },
        };
      }

      const verifyPassword: boolean = await bcrypt.compare(
        body.password,
        findUser.password,
      );

      if (!verifyPassword) {
        return {
          status: 400,
          json: { message: 'invalid username or password', data: null },
        };
      }

      const token = this.jwtService.sign({ id: findUser.id });

      return {
        status: 200,
        json: {
          message: 'successfully',
          data: {
            username: body.username,
            password: findUser.password,
            id: findUser.id,
            token,
          },
        },
      };
    } catch (error: any) {
      console.log(error.message);
    }
  }
}

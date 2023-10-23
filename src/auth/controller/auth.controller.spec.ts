import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import {
  ForToken,
  ToGetUsers,
  ToServiceGetusers,
} from '../service/service.types';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../../entities/users.entity';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('testing auth controller', () => {
  let authController: AuthController;
  let authService: AuthService;

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
      controllers: [AuthController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('GetUsers', () => {
    const result: ToGetUsers[] = [{ id: 1, username: 'max', password: '123' }];

    it('should return an array of users', async () => {
      jest
        .spyOn(authService, 'getUsers')
        .mockImplementation(
          async (token: ForToken): Promise<ToServiceGetusers> => {
            return { json: { message: 'smth', data: null }, status: 200 };
          },
        );

      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(result);
    });
  });
});

// describe('testing auth controller', () => {
//   let authController: AuthController;

//   const MockAuthService = {
//     getUsers: jest.fn((token, response: Response) => {
//       return [{ username: 'max', password: '1234' }];
//     }),
//     signUp: jest.fn().mockImplementation((body: UserInfo) => body),
//     signIn: jest.fn((body: UserInfo) => body),
//   };

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [AuthService],
//     })
//       .overrideProvider(AuthService)
//       .useValue(MockAuthService)
//       .compile();

//     authController = moduleRef.get<AuthController>(AuthController);
//   });

//   it('get list of users', () => {
//     expect(authController.getUsers('u', {} as any)).toStrictEqual([
//       {
//         username: 'max',
//         password: '1234',
//       },
//     ]);
//   });

//   it('add new user', () => {
//     expect(
//       authController.signUp({ username: 'alex', password: '1234' }),
//     ).toStrictEqual({ username: 'alex', password: '1234' });
//   });
// });

import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserInfo } from '../service/service.types';
import { AuthService } from '../service/auth.service';

describe('testing auth controller', () => {
  let authController: AuthController;

  const MockAuthService = {
    getUsers: jest.fn((token) => [{ username: 'max', password: '1234' }]),
    singUp: jest.fn().mockImplementation((body: UserInfo) => body),
    singIn: jest.fn((body: UserInfo) => body),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('get list of users', () => {
    expect(authController.getUsers('u')).toStrictEqual([
      {
        username: 'max',
        password: '1234',
      },
    ]);
  });

  it('add new user', () => {
    expect(
      authController.signUp({ username: 'alex', password: '1234' }),
    ).toStrictEqual({ username: 'alex', password: '1234' });
  });
});

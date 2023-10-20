import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/users.entity';

describe('auth service', () => {
  let authService = {
    getUsers: () => [{ username: 'user', password: 'password' }],
    signUp: (username: string, password: string) => ({ username, password }),
    signIn: (username: string, password: string) => ({ username, password }),
  };

  it('get users', async () => {
    const users = await authService.getUsers();

    expect(users).toStrictEqual([{ username: 'user', password: 'password' }]);
  });

  it('add new user', () => {
    expect(authService.signUp('max', 'password')).toStrictEqual({
      username: 'max',
      password: 'password',
    });
  });

  it('login of user', () => {
    expect(authService.signIn('max', 'password')).toStrictEqual({
      username: 'max',
      password: 'password',
    });
  });
});

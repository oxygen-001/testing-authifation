import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UserInfo } from './dto/auth.dto';
import * as request from 'supertest';

export const authE2ETest = () => {
  describe('auht (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleRef.createNestApplication();
      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });

    it('login ---> 200(POST)', () => {
      const user: UserInfo = {
        username: 'max',
        password: '123',
      };

      return request(app.getHttpServer())
        .post('/users/signin')
        .send(user)
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual({
            message: expect.any(String),
            data: expect.any(Object),
          });
        });
    });
  });
};

import { Users } from 'src/entities/users.entity';

const tools: object = {
  type: 'postgres' as any,
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'test',
  entities: [Users],
  synchronize: true,
};

export const connection = (): object => tools;

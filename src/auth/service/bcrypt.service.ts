import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  async decoded(planPassword: string, encrypted: string): Promise<boolean> {
    return await bcrypt.compare(planPassword, encrypted);
  }
}

import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfo {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForToken {
  @IsNotEmpty()
  token: string;
}

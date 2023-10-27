import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserInfo {
  @ApiProperty({
    required: true,
    name: 'username',
    description: 'to enter password',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({
    required: true,
    name: 'password',
    description: 'to enter username',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForToken {
  @IsNotEmpty()
  token: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TodoInfo {
  @ApiProperty({
    required: true,
    name: 'title',
    description: 'to enter title',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
    name: 'text',
    description: 'to enter text',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    required: true,
    name: 'isCompleted',
    description: 'to enter isCompleted',
    type: 'boolean',
  })
  @IsNotEmpty()
  @IsString()
  isCompleted: boolean;

  @ApiProperty({
    required: true,
    name: 'photo',
    description: 'to enter photo',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  photo: string;
}

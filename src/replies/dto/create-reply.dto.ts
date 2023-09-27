// create-reply.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

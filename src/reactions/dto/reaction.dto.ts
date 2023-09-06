import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateReactionDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsInt()
  tweetId: number;
  @IsNotEmpty()
  @IsInt()
  userId: number;
}

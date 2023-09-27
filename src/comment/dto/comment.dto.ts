import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
// import { Type } from 'class-transformer';


export class CreateCommentDto {
  @IsNotEmpty()
    @IsString()
    content: string;
  
    @IsNumber()
    authorId: number;
  }
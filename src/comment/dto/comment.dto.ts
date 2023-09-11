import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    content: string;
    
    @IsInt()
    authorId?: number;
  }
  
  // update-comment.dto.ts
  export class UpdateCommentDto {
    content: string;
  } 
  
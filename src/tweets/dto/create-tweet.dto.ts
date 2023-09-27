import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateTweetDto{

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    authorId: number;
}
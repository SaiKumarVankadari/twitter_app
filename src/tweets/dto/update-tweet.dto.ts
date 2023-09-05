import { IsNotEmpty, IsString } from "class-validator";


export class UpdateTweetDto{
    @IsString()
    @IsNotEmpty()
    content: string;
}
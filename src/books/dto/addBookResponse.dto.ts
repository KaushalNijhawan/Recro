import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class AddBookResponse{
    
    @Field()
    @IsNotEmpty()
    @IsString()
    message : string;

    @Field()
    @IsNotEmpty()
    @IsString()
    bookId: string;
}
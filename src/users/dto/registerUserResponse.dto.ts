import { Field, ObjectType } from "@nestjs/graphql"
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

@ObjectType()
export class RegisterUserReponse{
    @Field()
    @IsNotEmpty()
    @IsString()    
    message : string;
    
    @Field()
    @IsNumber()
    @IsNotEmpty()
    userId : number;
}
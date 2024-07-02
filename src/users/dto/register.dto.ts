import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@ObjectType()
export class RegisterUserDto{

    @Field()
    @IsNotEmpty()
    @IsString()
    username: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    password: string;

}
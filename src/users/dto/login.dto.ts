import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginDto{  

    @Field()
    @IsNotEmpty()
    @IsString()
    username : string;

    @Field()
    @IsNotEmpty()   
    @IsString()
    password: string;
}
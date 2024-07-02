import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class AddBooks{

    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    author: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    publishedYear: string;

}
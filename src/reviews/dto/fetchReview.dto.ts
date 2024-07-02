import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class FetchReview{

    @Field({ nullable : true})
    @IsOptional()
    @IsNumber()
    page : number;


    @Field({ nullable : true})
    @IsOptional()
    @IsNumber()
    limit : number;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    bookId : number;
}
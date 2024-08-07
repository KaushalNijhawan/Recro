import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class AddReviewRequest{

    @Field()
    @IsNotEmpty()
    @IsNumber()
    bookId: number;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @Field()
    @IsNotEmpty()
    @IsString()
    comment: string;
    
}

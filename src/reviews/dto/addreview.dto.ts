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
    userId: number;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @Field()
    @IsOptional()
    @IsString()
    comment: string;
    
}

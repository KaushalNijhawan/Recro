import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateReviewRequest{

    @Field()
    @IsNotEmpty()
    @IsNumber()
    reviewId: number;

    @Field({ nullable : true})
    @IsOptional()
    @IsNumber()
    rating: number;

    @Field({ nullable : true})
    @IsOptional()
    @IsString()
    comment: string;
}
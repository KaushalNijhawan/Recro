import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateReviewRequest{

    @Field()
    @IsNotEmpty()
    @IsNumber()
    reviewId: number;

    @Field()
    @IsOptional()
    @IsNumber()
    rating: number;

    @Field()
    @IsOptional()
    @IsString()
    comment: string;
}
import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsSemVer, IsString } from "class-validator";

@ObjectType()
export class AddReviewResponse{

    @Field()
    @IsNotEmpty()
    @IsNumber()
    reviewId: number;

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
    @IsString()
    message: string
}
import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class FetchBooks{
    @Field({ nullable : true})
    @IsOptional()
    @IsNumber()
    page: number;

    @Field({ nullable : true})
    @IsOptional()
    @IsNumber()
    limit: number;

    @Field({ nullable : true})
    @IsOptional()
    @IsString()
    filterType: string;

    @Field({ nullable : true})
    @IsOptional()
    @IsString()
    filterValue: string;
}
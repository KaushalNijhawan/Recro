import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ReviewSchema } from "src/reviews/schema/review.schema";

@ObjectType()
export class BooksSchema{

    @Field(() => ID)
    id : number;

    @Field()
    title: string;

    @Field()
    author: string;

    @Field()
    publishedYear: string;

    @Field(() => [ReviewSchema])
    reviews: ReviewSchema[]

}
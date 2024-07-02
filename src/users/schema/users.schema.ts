import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ReviewSchema } from "src/reviews/schema/review.schema";

@ObjectType()
export class UserSchema{

    @Field(()=> ID)
    id: number;

    @Field(()=> [ReviewSchema])
    reviews: ReviewSchema[];

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;

}
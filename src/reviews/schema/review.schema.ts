import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ReviewSchema{

        @Field(() => ID)
        id: number;

        @Field()
        bookId : number;

        @Field()
        userId: number;

        @Field()
        rating: number;

        @Field({ nullable : true})
        comment? : string;

        @Field()
        createdAt: Date;
    }
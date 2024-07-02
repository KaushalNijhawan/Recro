import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BooksSchema } from "src/books/schema/books.schema";
import { UserSchema } from "src/users/schema/users.schema";

@ObjectType()
export class ReviewSchema{

        @Field(() => ID)
        id: number;

        @Field(() => BooksSchema)
        book : BooksSchema

        @Field(() => UserSchema)
        user : UserSchema;

        @Field()
        rating: number;

        @Field({ nullable : true})
        comment? : string;

        @Field()
        createdAt: Date;
    }
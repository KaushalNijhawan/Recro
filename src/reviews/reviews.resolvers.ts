import { Args, Query, Resolver, Int } from "@nestjs/graphql";
import { ReviewSchema } from "./schema/review.schema";
import { ReviewService } from "./reviews.service";

@Resolver(of => ReviewSchema)
export class ReviewResolver{

    constructor(private readonly reviewService : ReviewService){}

    @Query(returns => [ReviewSchema])
    async getReviews(@Args("bookId", { type : ()=> Int}) bookId: number ){
        try{
            return await this.reviewService.fetchReviewByBookId(bookId);
        }catch(error){
            console.error(error);
            return [];
        }
    }

    @Query(returns => [ReviewSchema])
    async getMyReviews(){

    }
}
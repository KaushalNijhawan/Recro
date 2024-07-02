import { Args, Query, Resolver, Int, Context } from "@nestjs/graphql";
import { ReviewSchema } from "./schema/review.schema";
import { ReviewService } from "./reviews.service";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";

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
    async getMyReviews(@Context() context : any ){

    }

    @Query(returns => AddReviewResponse)
    async addReviews(@Args("addReview") addReview : AddReviewRequest){
        try{
            return await this.reviewService.addReview(addReview);
        }catch(error){
            console.error(error);
            return {
                message : "Something went wrong"
            }
        }
    }
}
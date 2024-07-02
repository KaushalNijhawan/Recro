import { Args, Query, Resolver, Int, Context, Mutation } from "@nestjs/graphql";
import { ReviewSchema } from "./schema/review.schema";
import { ReviewService } from "./reviews.service";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGaurdJwt } from "src/auth.guard";
import { UpdateReviewRequest } from "./dto/updateReviewRequest.dto";
import { FetchReview } from "./dto/fetchReview.dto";


@Resolver(of => ReviewSchema)
export class ReviewResolver{

    constructor(private readonly reviewService : ReviewService){}

    @Query(returns => [ReviewSchema])
    async getReviews(@Args("fetchReview")fetchReview : FetchReview){
        try{
            return await this.reviewService.fetchReviewByBookId(fetchReview);
        }catch(error){
            console.error(error);
            return [];
        }
    }

    @UseGuards(AuthGaurdJwt)
    @Query(returns => [ReviewSchema])
    async getMyReviews(@Context() context : any ){
      try{
        const userId = context.req.userId;
        return await this.reviewService.fetchReviewByUserId(userId);
      }catch(error){
          console.error(error);
          return [];
      }
    }

    @UseGuards(AuthGaurdJwt)
    @Mutation(returns => AddReviewResponse)
    async addReviews(@Args("addReview") addReview : AddReviewRequest, @Context() context : any ){
        try{
            const userId = context.req.userId;
            return await this.reviewService.addReview(addReview, userId);
        }catch(error){
            console.error(error);
            return {
                message : "Something went wrong"
            }
        }
    }

    @UseGuards(AuthGaurdJwt)
    @Mutation(returns => AddReviewResponse)
    async updateReview(@Args("updateReview") updateReview : UpdateReviewRequest , @Context() context : any){
        try{
            const userId = context.req.userId;
            return await this.reviewService.updateReview(updateReview, userId);
        }catch(error){
            console.error(error);
            return {
                message : "Something went wrong"
            }
        }
    }

    @UseGuards(AuthGaurdJwt)
    @Mutation(returns => String)
    async DeleteReview(@Args("reviewId") reviewId : number , @Context() context : any){
        try{
            return await this.reviewService.deleteReview(reviewId);
        }catch(error){
            console.error(error);
            return {
                message : "Something went wrong"
            }
        }
    }
}
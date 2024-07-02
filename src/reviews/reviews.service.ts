import { Injectable } from "@nestjs/common";
import { ReviewRepository } from "./reviews.repository";
import { Review } from "@prisma/client";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";
import { UpdateReviewRequest } from "./dto/updateReviewRequest.dto";
import { FetchReview } from "./dto/fetchReview.dto";
/**
 * ReviewService class responsible for handling review-related operations.
 * Includes methods to fetch reviews by book ID, add a new review, update an existing review,
 * delete a review, and fetch reviews by user ID.
 */@Injectable()
export class ReviewService{

    constructor(private readonly reviewRepo : ReviewRepository){}

    async fetchReviewByBookId(fetchReview : FetchReview): Promise<Review[]>{
        try{
            return await this.reviewRepo.fetchReviewsByBookId(fetchReview);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async addReview(addReview : AddReviewRequest, userId : number): Promise<AddReviewResponse>{
        try{
            return await this.reviewRepo.addReview(addReview, userId);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async updateReview(updateReview: UpdateReviewRequest, userId: number){
        try{
            return await this.reviewRepo.updateReview(updateReview, userId);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async deleteReview(reviewId: number){
       try{
          return await this.reviewRepo.deleteReview(reviewId);
       }catch(error){
          console.error(error);
          throw error;
       }
    }

    async fetchReviewByUserId(userId: number){
      try{
        return await this.reviewRepo.fetchReviewByUserId(userId);
      }catch(error){
        console.error(error);
        throw error;
      }
    }
}
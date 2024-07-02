import { Injectable } from "@nestjs/common";
import { ReviewRepository } from "./reviews.repository";
import { Review } from "@prisma/client";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";
import { UpdateReviewRequest } from "./dto/updateReviewRequest.dto";

@Injectable()
export class ReviewService{

    constructor(private readonly reviewRepo : ReviewRepository){}

    async fetchReviewByBookId(bookId:  number, pageNumber?: number , limit?: number): Promise<Review[]>{
        try{
            return await this.reviewRepo.fetchReviewsByBookId(bookId, pageNumber, limit);
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
import { Injectable } from "@nestjs/common";
import { ReviewRepository } from "./reviews.repository";
import { Review } from "@prisma/client";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";

@Injectable()
export class ReviewService{

    constructor(private readonly reviewRepo : ReviewRepository){}

    async fetchReviewByBookId(bookId:  number): Promise<Review[]>{
        try{
            return await this.reviewRepo.fetchReviewsByBookId(bookId);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async addReview(addReview : AddReviewRequest): Promise<AddReviewResponse>{
        try{
            return await this.reviewRepo.addReview(addReview);
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
import { Injectable } from "@nestjs/common";
import { ReviewRepository } from "./reviews.repository";
import { Review } from "@prisma/client";

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
}
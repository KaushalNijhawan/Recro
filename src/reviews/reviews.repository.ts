import { Injectable } from "@nestjs/common";
import { Review } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";

@Injectable()
export class ReviewRepository{
    constructor(private readonly prismaService : PrismaService){}

    async fetchReviewsByBookId(bookId: number): Promise<Review[]>{
        try{
            return await this.prismaService.review.findMany({ where : { bookId : bookId}});
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async addReview(addReview : AddReviewRequest): Promise<AddReviewResponse>{
        try{
            const reviewToSave = await this.prismaService.review.create({
                data : {
                    rating : addReview?.rating,
                    bookId : addReview?.bookId,
                    userId : addReview?.userId,
                    comment : addReview?.comment
                }
            });

            return {
                userId: reviewToSave?.userId,
                bookId: reviewToSave?.bookId,
                reviewId: reviewToSave?.id,
                message: "Saved"
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
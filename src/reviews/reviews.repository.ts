import { Injectable } from "@nestjs/common";
import { Review } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddReviewRequest } from "./dto/addreview.dto";
import { AddReviewResponse } from "./dto/addReviewResponse.dto";
import { UpdateReviewRequest } from "./dto/updateReviewRequest.dto";
import { FetchReview } from "./dto/fetchReview.dto";
import { MessageConstants } from "src/constants/messageConstants";

/**
 * ReviewRepository class responsible for handling CRUD operations related to reviews.
 * Includes methods for fetching reviews by book ID, deleting a review, adding a new review, updating an existing review, and fetching reviews by user ID.
 */
@Injectable()
export class ReviewRepository{
    constructor(private readonly prismaService : PrismaService){}

    async fetchReviewsByBookId(fetchReview : FetchReview): Promise<Review[]>{
        try{
            let skipElements = 0 ;
            const limit = fetchReview?.limit;
            const pageNumber = fetchReview?.page;
            const bookId = fetchReview?.bookId;
            if(pageNumber && limit && pageNumber > 1){
               skipElements = (pageNumber-1)*limit;
            }
            return await this.prismaService.review.findMany({ where : { bookId : bookId}, skip : skipElements , take : limit});
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async deleteReview(reviewId: number){
        try{
            await this.prismaService.review.delete({ where : { id : reviewId}});
            return "deleted!";
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async addReview(addReview : AddReviewRequest, userId: number): Promise<AddReviewResponse>{
        try{
            const reviewToSave = await this.prismaService.review.create({
                data : {
                    rating : addReview?.rating,
                    bookId : addReview?.bookId,
                    userId : userId,
                    comment : addReview?.comment
                }
            });

            return {
                userId: reviewToSave?.userId,
                bookId: reviewToSave?.bookId,
                reviewId: reviewToSave?.id,
                message: MessageConstants.SUCCESS
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async updateReview(updateReview: UpdateReviewRequest, userId: number){
        try{
             const reviewToUpdate = await this.prismaService.review.update({ where:{
                userId : userId,
                id: updateReview?.reviewId
            }, data:{
                rating : updateReview?.rating,
                comment : updateReview?.comment
            }});
            return {
                userId: reviewToUpdate?.userId,
                bookId: reviewToUpdate?.bookId,
                reviewId: reviewToUpdate?.id,
                message: "Saved"
            }
        }catch(error){
          console.error(error);
          throw error;
        }
    }

    async fetchReviewByUserId(userId: number){
        try{
            return await this.prismaService.review.findMany({ where : {userId : userId}});
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
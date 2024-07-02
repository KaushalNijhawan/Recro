import { Injectable } from "@nestjs/common";
import { Review } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

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
}
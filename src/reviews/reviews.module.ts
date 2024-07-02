import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolvers';
import { ReviewRepository } from './reviews.repository';
import { ReviewService } from './reviews.service';

@Module({
    providers:[ReviewResolver, ReviewRepository, ReviewService],
    exports:[ReviewService]
})
export class ReviewsModule {}

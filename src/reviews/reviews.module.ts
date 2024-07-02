import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolvers';
import { ReviewRepository } from './reviews.repository';
import { ReviewService } from './reviews.service';
import { AuthGaurd } from 'src/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers:[ReviewResolver, ReviewRepository, ReviewService, AuthGaurd, PrismaService],
    exports:[ReviewService]
})
export class ReviewsModule {}

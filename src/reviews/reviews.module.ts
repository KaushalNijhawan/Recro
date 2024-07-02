import { Module } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolvers';
import { ReviewRepository } from './reviews.repository';
import { ReviewService } from './reviews.service';
import { AuthGaurdJwt } from 'src/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers:[ReviewResolver, ReviewRepository, ReviewService, AuthGaurdJwt, PrismaService, AuthGaurdJwt],
    exports:[ReviewService]
})
export class ReviewsModule {}

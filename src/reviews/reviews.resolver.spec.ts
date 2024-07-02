// review.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './reviews.service';
import { AddReviewRequest } from './dto/addreview.dto';
import { UpdateReviewRequest } from './dto/updateReviewRequest.dto';
import { FetchReview } from './dto/fetchReview.dto';
import { AddReviewResponse } from './dto/addReviewResponse.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageConstants } from 'src/constants/messageConstants';
import { ReviewResolver } from './reviews.resolvers';

describe('ReviewResolver', () => {
  let resolver: ReviewResolver;
  let reviewService: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewResolver,
        {
          provide: ReviewService,
          useValue: {
            fetchReviewByBookId: jest.fn(),
            fetchReviewByUserId: jest.fn(),
            addReview: jest.fn(),
            updateReview: jest.fn(),
            deleteReview: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<ReviewResolver>(ReviewResolver);
    reviewService = module.get<ReviewService>(ReviewService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getReviews', () => {
    it('should return a list of reviews', async () => {
      const fetchReviewDto: FetchReview = null;
      const reviews = [{ id: 1, bookId: 1, userId: 1, content: 'Great book!' }];

    //   jest.spyOn(reviewService, 'fetchReviewByBookId').mockResolvedValue(reviews);

      expect(await resolver.getReviews(fetchReviewDto)).toBe(reviews);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const fetchReviewDto: FetchReview = null;

      jest.spyOn(reviewService, 'fetchReviewByBookId').mockRejectedValue(new Error('Error'));

      await expect(resolver.getReviews(fetchReviewDto)).rejects.toThrow(HttpException);
      await expect(resolver.getReviews(fetchReviewDto)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('getMyReviews', () => {
    it('should return a list of user reviews', async () => {
      const userId = 1;
      const reviews = [{ id: 1, bookId: 1, userId, content: 'Great book!' }];

      //jest.spyOn(reviewService, 'fetchReviewByUserId').mockResolvedValue(reviews);

      const context = { req: { userId } };
      expect(await resolver.getMyReviews(context)).toBe(reviews);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const userId = 1;

      jest.spyOn(reviewService, 'fetchReviewByUserId').mockRejectedValue(new Error('Error'));

      const context = { req: { userId } };

      await expect(resolver.getMyReviews(context)).rejects.toThrow(HttpException);
      await expect(resolver.getMyReviews(context)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('addReviews', () => {
    it('should add a review and return a response', async () => {
      const addReviewDto: AddReviewRequest = { bookId: 1, comment: 'Great book!', rating:2 };
      const addReviewResponse: AddReviewResponse = { bookId: 1, userId: 1,reviewId:2,  message: 'success' };

      jest.spyOn(reviewService, 'addReview').mockResolvedValue(addReviewResponse);

      const context = { req: { userId: 1 } };

      expect(await resolver.addReviews(addReviewDto, context)).toBe(addReviewResponse);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const addReviewDto: AddReviewRequest = { bookId: 1, comment: 'Great book!', rating :2};

      jest.spyOn(reviewService, 'addReview').mockRejectedValue(new Error('Error'));

      const context = { req: { userId: 1 } };

      await expect(resolver.addReviews(addReviewDto, context)).rejects.toThrow(HttpException);
      await expect(resolver.addReviews(addReviewDto, context)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('updateReview', () => {
    it('should update a review and return a response', async () => {
      const updateReviewDto: UpdateReviewRequest = { reviewId: 2, comment: 'Updated content', rating:3 };
      const updateReviewResponse: AddReviewResponse = { reviewId:2,bookId: 1, userId: 1, message:"success" };

      jest.spyOn(reviewService, 'updateReview').mockResolvedValue(updateReviewResponse);

      const context = { req: { userId: 1 } };

      expect(await resolver.updateReview(updateReviewDto, context)).toBe(updateReviewResponse);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const updateReviewDto: UpdateReviewRequest = { reviewId:2, comment: 'Updated content', rating:2 };

      jest.spyOn(reviewService, 'updateReview').mockRejectedValue(new Error('Error'));

      const context = { req: { userId: 1 } };

      await expect(resolver.updateReview(updateReviewDto, context)).rejects.toThrow(HttpException);
      await expect(resolver.updateReview(updateReviewDto, context)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });

  describe('deleteReview', () => {
    it('should delete a review and return success message', async () => {
      const reviewId = 1;
      const userId = 1;

    //   jest.spyOn(reviewService, 'deleteReview').mockResolvedValue();

      const context = { req: { userId } };

      expect(await resolver.DeleteReview(reviewId, context)).toBe('Review deleted successfully');
      expect(reviewService.deleteReview).toHaveBeenCalledWith(reviewId, userId);
    });

    it('should throw an HttpException when an error occurs', async () => {
      const reviewId = 1;
      const userId = 1;

      jest.spyOn(reviewService, 'deleteReview').mockRejectedValue(new Error('Error'));

      const context = { req: { userId } };

      await expect(resolver.DeleteReview(reviewId, context)).rejects.toThrow(HttpException);
      await expect(resolver.DeleteReview(reviewId, context)).rejects.toThrow(
        new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY),
      );
    });
  });
});
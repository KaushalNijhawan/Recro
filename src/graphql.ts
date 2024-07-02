
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AddReviewRequest {
    bookId: number;
    userId: number;
    rating: number;
    comment: string;
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface RegisterUserDto {
    username: string;
    email: string;
    password: string;
}

export interface BooksSchema {
    id: string;
    title: string;
    author: string;
    publishedYear: string;
    reviews: ReviewSchema[];
}

export interface ReviewSchema {
    id: string;
    book: BooksSchema;
    user: UserSchema;
    rating: number;
    comment?: Nullable<string>;
    createdAt: DateTime;
}

export interface UserSchema {
    id: string;
    reviews: ReviewSchema[];
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface RegisterUserReponse {
    message: string;
    userId: number;
}

export interface AddReviewResponse {
    reviewId: number;
    bookId: number;
    userId: number;
    message: string;
}

export interface IQuery {
    getReviews(bookId: number): ReviewSchema[] | Promise<ReviewSchema[]>;
    getMyReviews(): ReviewSchema[] | Promise<ReviewSchema[]>;
    addReviews(addReview: AddReviewRequest): AddReviewResponse | Promise<AddReviewResponse>;
}

export interface IMutation {
    loginUser(loginUser: LoginDto): LoginResponse | Promise<LoginResponse>;
    registerUser(registerUser: RegisterUserDto): RegisterUserReponse | Promise<RegisterUserReponse>;
}

export type DateTime = any;
type Nullable<T> = T | null;

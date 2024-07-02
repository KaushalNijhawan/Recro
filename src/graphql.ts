
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface FetchBooks {
    page?: Nullable<number>;
    limit?: Nullable<number>;
    filterType?: Nullable<string>;
    filterValue?: Nullable<string>;
}

export interface FetchReview {
    page?: Nullable<number>;
    limit?: Nullable<number>;
    bookId: number;
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

export interface AddBooks {
    title: string;
    author: string;
    publishedYear: string;
}

export interface AddReviewRequest {
    bookId: number;
    rating: number;
    comment: string;
}

export interface UpdateReviewRequest {
    reviewId: number;
    rating?: Nullable<number>;
    comment?: Nullable<string>;
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

export interface AddBookResponse {
    message: string;
    bookId: string;
}

export interface AddReviewResponse {
    reviewId: number;
    bookId: number;
    userId: number;
    message: string;
}

export interface IQuery {
    getBooks(fetchBooksDto: FetchBooks): BooksSchema[] | Promise<BooksSchema[]>;
    getBookById(bookId: number): Nullable<BooksSchema> | Promise<Nullable<BooksSchema>>;
    getReviews(fetchReview: FetchReview): ReviewSchema[] | Promise<ReviewSchema[]>;
    getMyReviews(): ReviewSchema[] | Promise<ReviewSchema[]>;
}

export interface IMutation {
    loginUser(loginUserType: LoginDto): LoginResponse | Promise<LoginResponse>;
    registerUser(registerUserType: RegisterUserDto): RegisterUserReponse | Promise<RegisterUserReponse>;
    addBooks(addBookDto: AddBooks): AddBookResponse | Promise<AddBookResponse>;
    addReviews(addReview: AddReviewRequest): AddReviewResponse | Promise<AddReviewResponse>;
    updateReview(updateReview: UpdateReviewRequest): AddReviewResponse | Promise<AddReviewResponse>;
    DeleteReview(reviewId: number): string | Promise<string>;
}

export type DateTime = any;
type Nullable<T> = T | null;

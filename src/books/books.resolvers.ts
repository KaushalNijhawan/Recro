import { Args, Query, Resolver, Int, Mutation, Context } from "@nestjs/graphql";
import {Book} from "@prisma/client";
import { BookService } from "./books.service";
import { BooksSchema } from "./schema/books.schema";
import { AddBooks } from "./dto/add.books.dto";
import { AddBookResponse } from "./dto/addBookResponse.dto";
import { FetchBooks } from "./dto/fetchBooks.dto";
import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGaurdJwt } from "src/auth.guard";
import { MessageConstants } from "src/constants/messageConstants";
/**
 * Resolver class for handling GraphQL queries and mutations related to books.
 * Includes methods for fetching all books, fetching a book by ID, and adding a new book.
 * Utilizes BookService to interact with the database.
 */
@Resolver(of => BooksSchema)
export class BookResolver{

    constructor(private readonly bookService : BookService){}

    @Query(returns => [BooksSchema])
    async getBooks(@Args("fetchBooksDto") fetchBooksDto :FetchBooks): Promise<Book[]>{
        try{
            return this.bookService.getAllBooks(fetchBooksDto);
        }catch(error){
            console.error(error);
            throw new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Query(returns => BooksSchema, {nullable : true})
    async getBookById(@Args("bookId", { type : () => Int }) bookId : number){
        try{
            return await this.bookService.getBookById(bookId);
        }catch(error){
            console.error(error);
            throw new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @UseGuards(AuthGaurdJwt)
    @Mutation(returns => AddBookResponse )
    async addBooks(@Args("addBookDto") addBookDto : AddBooks, @Context() context : any){
        try{
            return await this.bookService.addBooks(addBookDto);
        }catch(error){
            console.error(error);
            throw new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
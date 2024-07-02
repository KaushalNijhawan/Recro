import { Args, Query, Resolver, Int, Mutation, Context } from "@nestjs/graphql";
import {Book} from "@prisma/client";
import { BookService } from "./books.service";
import { BooksSchema } from "./schema/books.schema";
import { AddBooks } from "./dto/add.books.dto";
import { AddBookResponse } from "./dto/addBookResponse.dto";
import { FetchBooks } from "./dto/fetchBooks.dto";

@Resolver(of => BooksSchema)
export class BookResolver{

    constructor(private readonly bookService : BookService){}

    @Query(returns => [BooksSchema])
    async getBooks(@Args("fetchBooksDto") fetchBooksDto :FetchBooks): Promise<Book[]>{
        try{
            return this.bookService.getAllBooks(fetchBooksDto);
        }catch(error){
            console.error(error);
            return [];   
        }
    }

    @Query(returns => BooksSchema, {nullable : true})
    async getBookById(@Args("bookId", { type : () => Int }) bookId : number){
        try{
            return await this.bookService.getBookById(bookId);
        }catch(error){
            console.error(error);
            return [];
        }
    }

    @Mutation(returns => AddBookResponse )
    async addBooks(@Args("addBookDto") addBookDto : AddBooks, @Context() context : any){
        try{
            return await this.bookService.addBooks(addBookDto);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

}
import { Args, Query, Resolver, Int } from "@nestjs/graphql";
import {Book} from "@prisma/client";
import { BookService } from "./books.service";
import { BooksSchema } from "./schema/books.schema";
import { ReviewSchema } from "src/reviews/schema/review.schema";

@Resolver(of => BooksSchema)
export class BookResolver{

    constructor(private readonly bookService : BookService){}

    @Query(returns => [BooksSchema])
    async getBooks(): Promise<Book[]>{
        try{
            return this.bookService.getAllBooks();
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

}
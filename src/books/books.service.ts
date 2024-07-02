import { Injectable } from "@nestjs/common";
import { BookRepository } from "./books.repository";
import { Book } from "@prisma/client";
import { AddBooks } from "./dto/add.books.dto";
import { FetchBooks } from "./dto/fetchBooks.dto";
/**
 * Injectable class representing a BookService.
 * 
 * This class provides methods for retrieving all books, getting a book by its ID, and adding new books.
 */
@Injectable()
export class BookService{

    constructor(private  readonly  bookRepo : BookRepository){}

    async getAllBooks(fetchBooksDto :FetchBooks): Promise<Book[]>{
        try{
            return await this.bookRepo.getAllBooks(fetchBooksDto);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async getBookById(id : number): Promise<Book>{
        try{
            return await this.bookRepo.findBookById(id);
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async addBooks(bookDto : AddBooks):Promise<{bookId: number , message : string}>{
        try{
            return await this.bookRepo.addBooks(bookDto);
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
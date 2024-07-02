import { Injectable } from "@nestjs/common";
import { BookRepository } from "./books.repository";
import { Book } from "@prisma/client";
import { AddBooks } from "./dto/add.books.dto";

@Injectable()
export class BookService{

    constructor(private  readonly  bookRepo : BookRepository){}

    async getAllBooks(pageNumber?:number, limit?:number , filterType?:string, filterValue?: string): Promise<Book[]>{
        try{
            return await this.bookRepo.getAllBooks();
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
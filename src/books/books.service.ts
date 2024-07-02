import { Injectable } from "@nestjs/common";
import { BookRepository } from "./books.repository";
import { Book } from "@prisma/client";

@Injectable()
export class BookService{

    constructor(private  readonly  bookRepo : BookRepository){}

    async getAllBooks(): Promise<Book[]>{
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
}
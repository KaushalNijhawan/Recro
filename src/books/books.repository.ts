import { Injectable } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddBooks } from "./dto/add.books.dto";
import { filter } from "rxjs";
import { FetchBooks } from "./dto/fetchBooks.dto";

@Injectable()
export class BookRepository{
    constructor(private readonly prismaService : PrismaService){}

    async getAllBooks(fetchBooksDto :FetchBooks) : Promise<Book[]>{
        try{
            const filterType = fetchBooksDto?.filterType;
            const filterValue = fetchBooksDto?.filterValue;
            const pageNumber = fetchBooksDto?.page;
            const limit = fetchBooksDto?.limit;
            const whereClauseQuery = {}
            if(filterType && filterValue){
               if(filterType === "author"){
                   whereClauseQuery["author"] = filterValue;
               }else if(filterType === "title"){
                   whereClauseQuery["author"] = filterValue;
               }
            }
            let skipElements = 0 ;
            if(pageNumber && limit && pageNumber > 1 && limit > 0 ){
               skipElements = (pageNumber-1)*limit;
            }
            
            return await this.prismaService.book.findMany({ where : whereClauseQuery, skip: skipElements, take : limit});
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async findBookById(id: number): Promise<Book>{
        try{
            return await this.prismaService.book.findUnique({ where: { id : id}});
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async addBooks(bookDto : AddBooks):Promise<{bookId: number , message : string}>{
        try{
            const bookToSave = await this.prismaService.book.create({
                data:{
                    author : bookDto?.author,
                    publishedYear : bookDto?.publishedYear,
                    title : bookDto?.title
                }
            });
            return {
                bookId : bookToSave?.id,
                message : "book Added!"
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
import { Injectable } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AddBooks } from "./dto/add.books.dto";

@Injectable()
export class BookRepository{
    constructor(private readonly prismaService : PrismaService){}

    async getAllBooks() : Promise<Book[]>{
        try{
            return await this.prismaService.book.findMany();
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
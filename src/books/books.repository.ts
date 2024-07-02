import { Injectable } from "@nestjs/common";
import { Book } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

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
}
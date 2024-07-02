import { Module } from '@nestjs/common';
import { BookRepository } from './books.repository';
import { BookService } from './books.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports:[PrismaService],
    providers : [BookRepository, BookService],
    exports:[BookService]
})
export class BooksModule {}

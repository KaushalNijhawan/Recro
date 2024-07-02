import { Module } from '@nestjs/common';
import { BookRepository } from './books.repository';
import { BookService } from './books.service';
import { AuthGaurd } from 'src/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports:[],
    providers : [BookRepository, BookService,  AuthGaurd, PrismaService],
    exports:[BookService]
})
export class BooksModule {}

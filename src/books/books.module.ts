import { Module } from '@nestjs/common';
import { BookRepository } from './books.repository';
import { BookService } from './books.service';
import { AuthGaurdJwt } from 'src/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookResolver } from './books.resolvers';

@Module({
    imports:[],
    providers : [BookRepository, BookService,  AuthGaurdJwt, PrismaService, BookResolver],
    exports:[BookService]
})
export class BooksModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts')
    }
  }), PrismaModule, UsersModule, BooksModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

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
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile : join(process.cwd(), 'src/schema.gql'),
    definitions: {
      path: join(process.cwd(), 'src/graphql.ts')
    },
    context : ({req}) =>({req}) // passing the context
  }),
  ConfigModule.forRoot({
    isGlobal : true,
    envFilePath : ".env"
  }),
  JwtModule.registerAsync({
    imports : [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET_KEY'), // Get JWT_SECRET from environment variables
      signOptions: { expiresIn: '1h' }, // Example sign options
    }),
    inject : [ConfigService]
  }), 
  PrismaModule, UsersModule, BooksModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

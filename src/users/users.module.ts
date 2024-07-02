import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserService } from './users.service';
import { UserResolver } from './users.resolvers';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports:[],
    providers:[UsersRepository, UserService, UserResolver, PrismaService, JwtService]
})
export class UsersModule {}

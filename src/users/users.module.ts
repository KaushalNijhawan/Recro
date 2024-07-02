import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserService } from './users.service';
import { UserResolver } from './users.resolvers';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtHelper } from './jwt.helper';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [UsersRepository, UserService, UserResolver, PrismaService,JwtHelper, ConfigService],
    exports:[JwtHelper]
})
export class UsersModule { }

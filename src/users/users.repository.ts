import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterUserDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { loginDto } from "./dto/login.dto";
import * as bycrpt from "bcrypt";

@Injectable()
export class UsersRepository{
    constructor(private readonly prismaService : PrismaService,
        private readonly jwwtService : JwtService
    ){}

    async addUser(registerUser : RegisterUserDto): Promise<string>{
        try{    
            const userToSave = await this.prismaService.user.create({
                data : {
                    email : registerUser?.email,
                    password : registerUser?.password,
                    username : registerUser?.username
                }
            });
            return "saved";
        }catch(error){
            console.error(error);
            throw new Error("Error While Saving User!");
        }
    }

    async verifyUser(loginUser: loginDto){
        try{
            const username = loginUser?.username;
            const user = await this.prismaService.user.findUnique({ where : { username}});
            const passwordEncrypted = user?.password;
            const isMatch = await bycrpt.compare(loginUser?.password, passwordEncrypted);
            if(isMatch){
                return await this.jwwtService.sign({ userId : user?.id});
            }else{
                throw Error("Invalid Username or Password!");
            }
        }catch(error){
            console.error(error);
            throw Error("Something went Wrong");
        }
    }
}
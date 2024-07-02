import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterUserDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bycrpt from "bcrypt";
import { JwtHelper } from "./jwt.helper";

@Injectable()
export class UsersRepository{
    constructor(private readonly prismaService : PrismaService,
        private readonly jwtHelper : JwtHelper
    ){}

    async addUser(registerUser : RegisterUserDto): Promise<{ message : string , userId: number}>{
        try{    
            const userToSave = await this.prismaService.user.create({
                data : {
                    email : registerUser?.email,
                    password : registerUser?.password,
                    username : registerUser?.username
                }
            });
            return {
                message : "saved",
                userId : userToSave?.id
            };
        }catch(error){
            console.error(error);
            throw new Error("Error While Saving User!");
        }
    }

    async verifyUser(loginUser: LoginDto){
        try{
            const username = loginUser?.username;
            const user = await this.prismaService.user.findUnique({ where : { username}});
            const passwordEncrypted = user?.password;
            const isMatch = await bycrpt.compare(loginUser?.password, passwordEncrypted);
            if(isMatch){
                return this.jwtHelper.fetchToken({ userId : user?.id});
            }else{
                throw Error("Invalid Username or Password!");
            }
        }catch(error){
            console.error(error);
            throw Error("Something went Wrong");
        }
    }
}
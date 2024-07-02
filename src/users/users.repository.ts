import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterUserDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import * as bycrpt from "bcrypt";
import { JwtHelper } from "./jwt.helper";
import { MessageConstants } from "src/constants/messageConstants";

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
                message : MessageConstants.SUCCESS,
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
            if(!user){
               throw new HttpException("User Not Found!", HttpStatus.UNAUTHORIZED);
            }
            const passwordEncrypted = user?.password;
            const isMatch = await bycrpt.compare(loginUser?.password, passwordEncrypted);
            if(isMatch){
                return this.jwtHelper.fetchToken({ userId : user?.id});
            }else{
                throw new HttpException("Invalid Username or Password!", HttpStatus.UNAUTHORIZED);
            }
        }catch(error){
            console.error(error);
            throw new HttpException(MessageConstants.SOMETHING_WENT_WRONG, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
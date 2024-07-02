import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { RegisterUserDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";
@Injectable()
export class UserService{

    constructor(private readonly usersRepo : UsersRepository){}

    async addUser(registerUser : RegisterUserDto): Promise<{ message : string , userId: number}>{
       try{
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(registerUser?.password, saltOrRounds);
            registerUser.password = hash;
            return await this.usersRepo.addUser(registerUser);
       }catch(error){
            console.error(error);
            throw error;
       } 
    }

    async loginUser(loginUser : LoginDto): Promise<string>{
        try{
            return await this.usersRepo.verifyUser(loginUser);
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}
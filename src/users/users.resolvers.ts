import { Args, Mutation, Resolver,   } from "@nestjs/graphql";
import { UserSchema } from "./schema/users.schema";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "./users.service";
import { LoginResponse } from "./dto/login.reponse.dto";
import { RegisterUserDto } from "./dto/register.dto";
import { RegisterUserReponse } from "./dto/registerUserResponse.dto";

@Resolver(of => UserSchema)
export class UserResolver{

    constructor(private readonly userService : UserService){}

    @Mutation(returns => LoginResponse)
    async loginUser(@Args("loginUserType") loginUserType : LoginDto){
        try{
            const token = await this.userService.loginUser(loginUserType);
            return {
                accessToken : token
            };
        }catch(error){
            console.error(error);
            return null;
        }
    }

    @Mutation(returns => RegisterUserReponse)
    async registerUser(@Args("registerUserType") registerUserType : RegisterUserDto ){
        try{    
            const response = await this.userService.addUser(registerUserType);
            console.log(response);
            return response;
        }catch(error){
            console.error(error);
            return error;    
        }
    }
    
}
import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { JwtHelper } from "./users/jwt.helper";
import { verify } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { MessageConstants } from "./constants/messageConstants";

export class AuthGaurdJwt extends AuthGuard('jwt'){
    constructor(private readonly configService : ConfigService){
        super();
    }
   
    canActivate(context: ExecutionContext): boolean {
        
        const ctx = GqlExecutionContext.create(context).getContext();
        const authHeader = ctx.req.headers.authorization;
        console.log(ctx.req.headers);
        if(!authHeader ){
            throw new UnauthorizedException(MessageConstants.INVALID_TOKEN);
        }
        const token = authHeader.split("Bearer ")[1];
        try{
            const response = verify(token, process.env.JWT_SECRET_KEY);
            console.log(response);
            ctx.req.userId = response["userId"];
        }catch(error){
            throw new UnauthorizedException(MessageConstants.INVALID_TOKEN);
        }
        
        return true;
    }
}
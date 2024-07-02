import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class AuthGaurd implements CanActivate{
    canActivate(context: ExecutionContext): boolean {

        const ctx = GqlExecutionContext.create(context).getContext();
        const authHeader = ctx.req.headers.authorization;

        if(!authHeader ){
            throw new UnauthorizedException("Invalid User");
        }
        console.log(authHeader);
        return true;
    }
}
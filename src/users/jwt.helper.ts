import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {sign, verify} from "jsonwebtoken";
@Injectable()
export class JwtHelper{
    constructor(private readonly configService : ConfigService){}

    fetchToken(payload){
      try{
         const token = sign(payload,this.configService.get("JWT_SECRET_KEY") , {expiresIn : "1h"});
         return token;
      }catch(error){
        console.error(error);
        throw error;
      }
    }

    verifyToken(token: string){
      try{
         const response = verify(token , this.configService.get("JWT_SECRET_KEY"));
         console.log(response);
         return true;
      }catch(error){
         console.error(error);
         return false;

      }
    }
}
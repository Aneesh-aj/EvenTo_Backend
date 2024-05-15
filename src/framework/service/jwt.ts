import { Iuser } from "../../entities/user";
import { Iorganizer } from "../../entities/organizer";
import { Ijwt,IToken } from "../../usecases/interface/service/jwt";
import jwt, { JwtPayload } from 'jsonwebtoken'
require('dotenv').config()

export class JWTtoken implements Ijwt{
  JWT_VERIFICATION_KEY= process.env.JWT_VERIFICATION_KEY || ""
  JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || ""
  JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || ""
     

      async createVerificationJWT(payload: any): Promise<string> {
          const verifyToken = await jwt.sign(payload, this.JWT_VERIFICATION_KEY,{
             expiresIn:'15m',
          })
          console.log("in side the servie",verifyToken )
          return verifyToken
      }

      async createAccessAndRefreshToken(id: string ): Promise<IToken> {
          const payload = {id}
          console.log("jwt in side ",payload)
           const accessToken = await jwt.sign(payload , this.JWT_ACCESS_KEY,{
              expiresIn:'5h'
           })

           const refreshToken = await jwt.sign(payload,this.JWT_REFRESH_KEY,{
             expiresIn:'3d',
           })
             console.log("returnsing")
           return {accessToken,refreshToken}
      }

      async  verifyJwt(token: string):Promise<void>{
         try{
          const data = await jwt.verify(token, this.JWT_VERIFICATION_KEY)
        return 
         }catch(error){
             throw error
         }
      }

      async  forgotPasswordToken(userId: string, email: string): Promise<string> {
           const token = await jwt.sign({userId,email}, this.JWT_VERIFICATION_KEY,{
             expiresIn:'10m'
           })
           return token
      }
}
import exp from "constants";
import { Request,Response,NextFunction } from "express";
import  jwt,{ JwtPayload,Secret } from "jsonwebtoken";
require("dotenv").config()


export const isAutheticate= async(req:Request,res: Response,next : NextFunction)=>{
     console.log( "commign to auth middlee")
     console.log("cookie",req.cookies)
     const accessToken = req.cookies.accessToken as string
     const refreshToken = req.cookies.refreshToken as string
     console.log("aceess",accessToken);
     console.log("refreshToken",refreshToken);
     if(!accessToken || !refreshToken){
           console.log(" in he first if")
       return   res.status(200).json({message:"Access Forbidd!!! pleas login again.",success:false})

     }
      
     console.log("process .env", process.env.JWT_VERIFICATION_KEY)

     const decode = await jwt.verify(accessToken,process.env.JWT_ACCESS_KEY as Secret)
     if(decode){
          console.log(" in side the if")
          next()
     }
   else{ 
     console.log("in the else")
      res.json({message:"Access Forbidd!!! pleas login again."}).status(400)
     
     }
}
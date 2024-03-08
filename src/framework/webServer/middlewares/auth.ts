import exp from "constants";
import { Request,Response,NextFunction } from "express";
import  jwt,{ JwtPayload,Secret } from "jsonwebtoken";
require("dotenv").config()


export const isAutheticate= async(req:Request,res: Response,next : NextFunction)=>{
     const accesToken = req.cookies.accesToken as string
     const refreshToken = req.cookies.refreshToken as string

     const decode = (await jwt.verify(accesToken,process.env.JWT_VERIFICATION_KEY as Secret)) as JwtPayload
}
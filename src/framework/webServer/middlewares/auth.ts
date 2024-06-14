import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { catchError } from "../../../usecases/middleares/catchError";
require("dotenv").config();

export const isAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken as string;
        const refreshToken = req.cookies.refreshToken as string;
          console.log(" coming here-----------------req.cookiee----auth",req.cookies)
          console.log("accessToken--",accessToken)
          console.log("refreshToken---",refreshToken)
          console.log(" user :---",req.cookies.role)
        if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: "Access Forbidden!!! Please login again.", success: false });
        }

        try {
            const decode = await jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as Secret);
            if (decode) {
                next();
            } else {
                return res.status(401).json({ message: "Access Forbidden!!! Please login again.", success: false });
            }
        } catch (error) {

            
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as Secret) as JwtPayload;
            if (!decodedRefreshToken) {
                return res.status(401).json({ message: "Access Forbidden!!! Please login again.", success: false });
            }

            const newAccessToken = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.JWT_ACCESS_KEY as Secret, { expiresIn: '15m' });
            res.cookie('accessToken', newAccessToken, { httpOnly: true });
              console.log("next")
            next();
        }
    } catch (error) {
         console.log(" sorry error")
        catchError(error, next);
    }
};

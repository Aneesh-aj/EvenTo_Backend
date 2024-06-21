import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { catchError } from '../../../usecases/middleares/catchError';
require('dotenv').config();

interface CustomRequest extends Request {
    user?: { userId: string; role: string };
}

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const isAuthenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const refreshToken = req.headers['x-refresh-token'] as string;
        const role = req.headers['x-user-role'] as string;
        console.log(" auth",authHeader)
        console.log(" ref",refreshToken)
        console.log(" role",role)



        if (!authHeader || !refreshToken || !role) {
            return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
        }

        const accessToken = authHeader.split(' ')[1];

        console.log('Coming here-----------------req.headers----auth', authHeader, refreshToken);
        console.log('accessToken--', accessToken);
        console.log('refreshToken---', refreshToken);
        console.log('role---', role);

        if (!accessToken && !refreshToken) {
            return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
        }

        try {
            const decode = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as Secret) as CustomJwtPayload;
            if (decode) {
                req.user = { userId: decode.userId, role }; // Attach role to req.user
                next();
            } else {
                return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
            }
        } catch (error) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as Secret) as CustomJwtPayload;
                if (!decodedRefreshToken) {
                    return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
                }

                const newAccessToken = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.JWT_ACCESS_KEY as Secret, { expiresIn: '15m' });
                res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                req.user = { userId: decodedRefreshToken.userId, role }; // Attach role to req.user
                next();
            } catch (err) {
                return res.status(401).json({ message: 'Access Forbidden!!! Please login again.', success: false });
            }
        }
    } catch (error) {
        console.log('Sorry, error');
        catchError(error, next);
    }
};

import express, { NextFunction, Router, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRoute } from '../routes/userRoute'
import { OrganizerRoute } from '../routes/organizerRoute'
import { AdminRoute } from '../routes/adminRoute'
import { errorMiddleware } from '../../../usecases/middleares/errorMiddleware'
import commentModel from '../../database/mongodb/model/comments'
import mongoose from 'mongoose'
import postModel from '../../database/mongodb/model/posts'
import dotenv from "dotenv"
import { CommentRoute } from '../routes/commentRoute'
dotenv.config()


export const app = express()


export const allowedOrigins = ["https://evento-kappa-eight.vercel.app", "http://localhost:5173"];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'PATCH', 'PUT', 'POST','DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'x-refresh-token', 'x-user-role','x-verify-token'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
console.log(" after the corss")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/user", UserRoute(express.Router()))
app.use("/organizer", OrganizerRoute(express.Router()))
app.use("/admin", AdminRoute(express.Router()))
app.use("/comments",CommentRoute(express.Router()))
const router = express.Router();


export default router;




app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(` route ${req.originalUrl} isn't found ` as any)
  next(error)
})


app.use(errorMiddleware)
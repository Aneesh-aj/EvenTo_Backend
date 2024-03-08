import express, { NextFunction,Router,  Request, Response} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { UserRoute } from '../routes/UserRoute'
import { OrganizerRoute } from '../routes/OrganizerRoute'
import { AdminRoute } from '../routes/AdminRoute'

export const app = express()

app.use(cors({
    origin : "http://localhost:5173",
    credentials:true,
    methods:['GET',"PATCH","PUT","POST"],
    optionsSuccessStatus:204,
}))



app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/user",UserRoute(express.Router()))
app.use("/organizer",OrganizerRoute(express.Router()))
app.use("/admin",AdminRoute(express.Router()))



app.all("*", (req: Request, res : Response, next: NextFunction)=>{
    const error = new Error(` route ${req.originalUrl} isn't found ` as any)
    next (error)
})

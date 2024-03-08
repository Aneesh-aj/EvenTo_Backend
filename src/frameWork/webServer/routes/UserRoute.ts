import {Route,Req , Res, Next } from "../../types/serverPackageTypes"
import { userController } from "./injections/Injection"


export function UserRoute(router: Route){
    router.post('/signup', (req : Req, res : Res , next : Next)=>{
           
        userController.signup(req,res,next)
    })

    router.post('/createUser', (req: Req, res : Res , next : Next)=>{
           userController.createUser(req,res,next)
    })

    router.post('/login',(req:Req, res: Res ,next:Next)=>{
        console.log("entering to the  router")
         userController.organizerLogin(req, res, next)
    })

   
    return router

}
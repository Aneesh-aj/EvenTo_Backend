import {Route,Req , Res, Next } from "../../types/serverPackageTypes"
import { userController } from "./injections/Injection"


export function UserRoute(router: Route){
    router.post('/register', (req : Req, res : Res , next : Next)=>{
           console.log("comming in router")
        userController.signup(req,res,next)
    })

    router.post('/createUser', (req: Req, res : Res , next : Next)=>{
        console.log("coming to the router",req.body)
        // return 
           userController.createUser(req,res,next)
    })

    router.post('/login',(req:Req, res: Res ,next:Next)=>{
        console.log("entering to the  router")
         userController.userLogin(req, res, next)
    })

   
    return router

}
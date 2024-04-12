import { Route,Req , Res , Next } from "../../types/serverPackageTypes";

import { organizerController } from "./injections/Injection";


export function OrganizerRoute(router: Route){

     router.post('/sentOtp',(req: Req , res : Res , next : Next)=>{
         console.log(" the body",req.body)
         organizerController.singup(req,res,next)
     })

     router.post('/register',(req : Req, res : Res , next : Next)=>{
        console.log("routerdkkkkkkkkkkkkk")
        organizerController.createOrganizer(req,res ,next)
     })

     router.post('/verifyotp',(req:Req,res:Res,next : Next)=>{
        console.log("coming to verifyotp router",req.body)
        organizerController.verifyOtp(req,res,next)
     })
    
     router.post("/logout",(req:Req,res:Res,next:Next)=>{
      organizerController.logout(req,res,next)
     })

     router.post("/approvel/:id",(req:Req,res:Res,next:Next)=>{
        organizerController.isApproved(req,res,next)
     })

     router.post("/login",(req:Req,res:Res,next:Next)=>{
        organizerController.login(req,res,next)
     })

     return router
}
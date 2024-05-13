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

    router.post('/logout',(req:Req,res:Res,next:Next)=>{
         userController.logout(req,res,next)
    })

    router.get('/profile/:id',(req:Req, res: Res ,next:Next)=>{
        console.log("entering to ")
         userController.userDetails(req, res, next)
    })

    router.post("/profileEdit/:id",(req:Req, res: Res ,next:Next)=>{
        console.log("entering to the  router",)

         userController.editProfile(req, res, next)
    })

    router.post("/profileUpload",(req:Req, res: Res ,next:Next)=>{
        console.log("entering to the  router",)

         userController.addProfilePicture(req, res, next)
    })

    router.post("/resendOtp",(req:Req,res:Res,next:Next)=>{
         userController.resendOtp(req,res,next)
    })

    router.get("/allorganizers",(req:Req,res:Res,next:Next)=>{
         userController.allorganizers(req,res,next)
    })

    router.get("/eventPostDetails/:id",(req:Req,res:Res,next:Next)=>{
          userController.eventPostDetails(req,res,next)
    })


    router.get("/seatBooking/:id",(req:Req,res:Res,next:Next)=>{
        userController.getSeats(req,res,next)
    })

    router.post("/Booking",(req:Req,res:Res,next:Next)=>{
        userController.bookSeat(req,res,next)
    })
  
    router.post("/payment",(req:Req,res:Res,next:Next)=>{
         userController.payment(req,res,next)
    })
    
    
   
    return router

}
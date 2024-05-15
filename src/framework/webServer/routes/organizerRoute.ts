import { Route, Req, Res, Next } from "../../types/serverPackageTypes";
import { isAuthenticate } from "../middlewares/auth";
import { isOrganizer } from "../middlewares/roleAuth";

import { organizerController } from "./injections/Injection";


export function OrganizerRoute(router: Route) {

   router.post('/sentOtp', (req: Req, res: Res, next: Next) => {
      console.log(" the body", req.body)
      organizerController.singup(req, res, next)
   })

   router.post('/register', (req: Req, res: Res, next: Next) => {
      console.log("routerdkkkkkkkkkkkkk")
      organizerController.createOrganizer(req, res, next)
   })

   router.post('/verifyotp', (req: Req, res: Res, next: Next) => {
      console.log("coming to verifyotp router", req.body)
      organizerController.verifyOtp(req, res, next)
   })

   router.post("/logout",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      organizerController.logout(req, res, next)
   })

   router.post("/approvel/:id",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      organizerController.isApproved(req, res, next)
   })

   router.post("/login",(req: Req, res: Res, next: Next) => {
      organizerController.login(req, res, next)
   })

   router.post("/backgroundUpload",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("image route")
      organizerController.uploadBackground(req, res, next)
   })

   router.get("/profile/:id",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("the organizer route")
      organizerController.findbyId(req, res, next)
   })

   router.post("/profilePicture",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("profile route ======================================e>")
      organizerController.uploadProfilePicture(req, res, next)
   })

   router.post("/resendOtp",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      organizerController.resendOtp(req, res, next)
   })

   router.get("/getEvents/:id",isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("entering to the  router",)

      organizerController.getEvents(req, res, next)
   })
   router.post("/eventCreate",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      organizerController.eventCreate(req, res, next)
   })
   
   router.get("/allcategory",isAuthenticate,(req:Req, res:Res,next:Next)=>{
      organizerController.getAllCategory(req,res,next)
  })

  router.post("/profileEdit",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
      organizerController.editProfile(req, res, next)

  })

  router.get("/categorys/:id",isOrganizer, isAuthenticate, (req:Req,res:Res,next)=>{
     organizerController.avalibleCategory(req,res,next)
  })

  router.post('/eventCreation',isOrganizer,isAuthenticate, (req:Req,res:Res,next:Next)=>{
        organizerController.createEvent(req,res,next)  
  })

  router.get("/getAllEvents/:id",isAuthenticate, (req:Req,res:Res,next:Next)=>{
   organizerController.getAllevents(req,res,next)  
  })

  router.get("/eventDetails/:id" ,isAuthenticate,(req:Req,res:Res,next:Next)=>{
      organizerController.getEventDetails(req,res,next)
  })
  
  router.post("/eventPost",isOrganizer ,isAuthenticate,(req:Req,res:Res,next:Next)=>{
    organizerController.eventPost(req,res,next)
  })

  router.get("/alleventPost" ,isAuthenticate,(req:Req,res:Res,next:Next)=>{
     console.log(" comming here")
      organizerController.getAlleventPost(req,res,next)
  })



   return router
}
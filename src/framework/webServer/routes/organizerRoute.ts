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

   router.post("/approvel/:id", (req: Req, res: Res, next: Next) => {
      organizerController.isApproved(req, res, next)
   })

   router.post("/login",(req: Req, res: Res, next: Next) => {
      organizerController.login(req, res, next)
   })

   router.post("/backgroundUpload",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("image route")
      organizerController.uploadBackground(req, res, next)
   })

   router.get("/profile/:id",isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("the organizer route")
      organizerController.findbyId(req, res, next)
   })

   router.post("/profilePicture",isOrganizer,isAuthenticate, (req: Req, res: Res, next: Next) => {
      console.log("profile route ======================================e>")
      organizerController.uploadProfilePicture(req, res, next)
   })

   router.post("/resendOtp", (req: Req, res: Res, next: Next) => {
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

  router.get("/categorys/:id", isAuthenticate, (req:Req,res:Res,next)=>{
     organizerController.avalibleCategory(req,res,next)
  })

  router.post('/eventCreation',isOrganizer,isAuthenticate, (req:Req,res:Res,next:Next)=>{
        organizerController.createEvent(req,res,next)  
  })
  router.post('/updateEvent',isOrganizer,isAuthenticate, (req:Req,res:Res,next:Next)=>{
   organizerController.updateEvent(req,res,next)  
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
     console.log(" comming here---------------------------------")
      organizerController.getAlleventPost(req,res,next)
  })

  router.get("/getUpcomingEvent/:id",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
      organizerController.getUpcomingEvent(req,res,next)
  })

  router.post("/changeStatus",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
    organizerController.changeStatus(req,res,next)
  })

  router.post("/cancel",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.cancelEvent(req,res,next)
 })
 router.get("/getOrganizerEventPost/:organizerId",isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.getEventPost(req,res,next)
 })

 router.post("/updatePost",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
    organizerController.updatePost(req,res,next)
 })


 router.get("/geAllbookings/:id",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.getAllbooking(req,res,next)
})

router.get("/getRequests/:id",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
    organizerController.getAllRequests(req,res,next)
})

router.get("/getRequestDetails/:id",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.getRequestDetails(req,res,next)
})

router.post("/approveRequest",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
     organizerController.approveRequest(req,res,next)
})
router.post("/rejectRequest",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.rejectRequest(req,res,next)
})

router.post('/eventCreation',isOrganizer,isAuthenticate, (req:Req,res:Res,next:Next)=>{
   organizerController.createEvent(req,res,next)  
})

router.post('/requestEventCreation',isOrganizer,isAuthenticate, (req:Req,res:Res,next:Next)=>{
   organizerController.requestEventCreation(req,res,next)  
})


router.get('/chatList/:id',isAuthenticate,(req:Req,res:Res,next:Next)=>{
    organizerController.getUserList(req,res,next)
})

router.post("/postCreate",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.createPost(req,res,next)
})

router.post("/postUpdate",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.postUpdate(req,res,next)
})

router.post("/deletePost/:postId",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
    console.log(" the delete psot ")
   organizerController.deletePost(req,res,next)
})

router.get("/getPosts/:organizerId",isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.getPosts(req,res,next)
})


router.get('/getDashboardData/:organizerId',isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.getDashboardData(req,res,next)
})

router.get('/getRevenue/:organizerId',isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.getRevenue(req,res,next)
})

router.get("/getEventGraph/:organizerId",isOrganizer,isAuthenticate,(req:Req,res:Res,next:Next)=>{
   organizerController.eventGraph(req,res,next)
})



 


   return router
}
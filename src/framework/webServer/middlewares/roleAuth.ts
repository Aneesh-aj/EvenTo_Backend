import { Next, Req, Res } from "../../types/serverPackageTypes";


export const isUser = async(req:Req,res:Res,next:Next)=>{
     try{
              console.log(" the req cookie",req.cookies)
         if(req.cookies.role ==='user'){
              console.log("----------------------------------------------------------cominggg")
             next()
         }else{
             console.log("no role errorrrrr")
            res.json({message:"inValid Access !!! Login again",success:false}).status(401)
         }

     }catch(error){
         throw error
     }
}


export const isOrganizer = async(req:Req,res:Res,next:Next)=>{
    try{
       
        if(req.cookies.role ==='organizer'){
             console.log("----------------------------------------------------------cominggg")
            next()
        }else{
           res.json({message:"inValid Access",success:false}).status(401)
        }

    }catch(error){
        throw error
    }
}

export const isAdmin = async (req:Req,res:Res,next:Next)=>{
     try{

        if(req.cookies.role ==="admin"){
              next()
        }else{
             res.status(401).json({message:"inValid access",success:false})
        }

     }catch(error){
         throw error
     }
}
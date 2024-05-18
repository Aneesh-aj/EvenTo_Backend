import { Istripe } from "../../interface/repositoryInterface/stripeRepository"


export const payment = async(userId:string,eventId:string,seat:[],amount:string,postId:string,stripeRepository:Istripe):Promise<any>=>{
    try{
       const response = await stripeRepository.payment(userId,eventId,seat,amount)
        console.log("----------------------function of payment-------------",response)
       return response 
    }catch(error){
         throw error
    }
}
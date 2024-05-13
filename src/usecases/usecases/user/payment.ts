import { Istripe } from "../../interface/repositoryInterface/stripeRepository"


export const payment = async(userId:string,eventId:string,seat:[],amount:string,stripeRepository:Istripe):Promise<any>=>{
    try{
       const response = await stripeRepository.payment(userId,eventId,seat,amount)
       return response 
    }catch(error){
         throw error
    }
}
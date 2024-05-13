import { Req } from "../../../framework/types/serverPackageTypes";
import { Istripe } from "../../interface/repositoryInterface/stripeRepository";

export const paymentStatus= async(req:Req,stripe:Istripe):Promise<boolean | null>=>{
    try{ 

        const response = await stripe.paymentStatus(req)
        return  true

    }catch(error){
        throw error
    }
}
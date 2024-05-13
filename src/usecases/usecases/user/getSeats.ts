import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";


export const getSeats = async(id:string,eventRepository:IeventRepository):Promise<{seat:[]} | undefined>=>{
    try{
        const seats = await eventRepository.getSeat(id)
          console.log(" the resssssss-=----------------",seats)
        return seats

    }catch(error){
        throw error
    }
}
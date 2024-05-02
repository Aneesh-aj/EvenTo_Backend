import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";



export const getCategory = async (id: string, organizerRepository: IorganizerRepository): Promise<[] | undefined> => {
    try {
        const organizer = await organizerRepository.findbyId(id)
        console.log(" the organier from the backend",organizer)
        if(!organizer)return undefined
        return organizer.eventCategory
    } catch (error) {
        throw error
    }
}
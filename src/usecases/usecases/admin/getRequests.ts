import { Iorganizer } from "../../../entities/organizer";
import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";

export const getRequests = async (organizerRepository: IorganizerRepository): Promise<Iorganizer[]> => {
    try {
        
        const result = await organizerRepository.getAll();
        if (!result) {
            console.error("Failed to fetch requests.");
            return [];
        }        
        return result;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

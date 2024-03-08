import { Iorganizer } from "../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const block = async (id:string,organizerModels: typeof organizerModel) : Promise < any | void > =>{
    try{
        console.log("Inside the repo=========================================================================================================================================================");

        // Find the organizer by ID
        const organizer = await organizerModel.findById(id);

        // If the organizer is found
        if (organizer) {
            // Toggle the approved field
            organizer.blocked = !organizer.blocked;

            // Save the updated organizer
            const updatedOrganizer = await organizer.save();

            console.log("Updated organizer:", updatedOrganizer);

            return updatedOrganizer;
        } else {
            console.log("Organizer not found");
            return;
        }
    }catch(error){
        console.log("error in findemail ",error)
    }
}
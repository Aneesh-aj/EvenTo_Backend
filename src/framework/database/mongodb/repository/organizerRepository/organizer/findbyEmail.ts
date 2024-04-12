import { Iorganizer } from "../../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const findbyEmail = async (email: string, organizerModels: typeof organizerModel): Promise<Iorganizer | null> => {
    try {
        const org = await organizerModel.findOne({ email })
        return org
    } catch (error) {
        throw error
    }
}
import { Iorganizer } from "../../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";


export const findbyEmail = async (email: string, organizerModels: typeof organizerModel): Promise<string | void> => {
    try {
        const org = await organizerModel.findOne({ email })
        if (email) return
    } catch (error) {
        throw error
    }
}
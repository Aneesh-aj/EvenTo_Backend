import { IeventCategory } from "../../../../../../entities/eventCategory";
import categoryModel from "../../../model/eventCategory";

export const addCategory = async (category: string): Promise<IeventCategory | undefined> => {
    try {
        const normalizedCategory = category.toLowerCase();

        const exist = await categoryModel.findOne({ category: { $regex: new RegExp(`^${normalizedCategory}$`, 'i') } });

        if (exist) {
            return undefined;
        }

        // If no such category exists, add the new category
        const addedCategory = await categoryModel.create({ category: category });

        return addedCategory;
    } catch (error) {
        throw error;
    }
};

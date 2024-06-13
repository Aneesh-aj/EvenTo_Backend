import categoryModel from "../../../model/eventCategory";

export const editCategory = async (id: string, category: string): Promise<{ success: boolean, message: string }> => {
    try {
        const exist = await categoryModel.findById(id);
        if (!exist) {
            return { success: false, message: "Invalid category Id" };
        }

        const similarCategories = await categoryModel.find({ category: { $regex: new RegExp(`^${category}$`, 'i') }, _id: { $ne: id } });

        if (similarCategories.length > 0) {
            return { success: false, message: "Name already exists for another category" };
        }

        const updated = await categoryModel.updateOne({ _id: id }, { category: category });

        console.log("Updated:", updated);

        return { success: true, message: "Category updated successfully" };
    } catch (error) {
        throw error;
    }
};

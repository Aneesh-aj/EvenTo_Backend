import { IorganizerAndAddress } from "../../../../../../entities/organizer";
import organizerModel from "../../../model/organizer";
import mongoose from "mongoose"; // Import mongoose

export const allDetailsById = async (id: string): Promise<IorganizerAndAddress | undefined> => {
    try {
        const objectId =new  mongoose.Types.ObjectId(id); // Convert id string to ObjectId

        const alldetails = await organizerModel.aggregate([
            {
                $match: {
                    _id: objectId // Use the converted ObjectId in the $match stage
                }
            },
            {
                $lookup: {
                    from: "adresses",
                    let: { organizerId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$userId", { $toString: "$$organizerId" }]
                                }
                            }
                        }
                    ],
                    as: "address"
                }
            }
        ]);

        console.log("details ===>", alldetails);

        return alldetails && alldetails.length > 0 ? alldetails[0] : undefined;
    } catch (error) {
        throw error;
    }
}

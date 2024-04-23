import { IorganizerAndAddress } from "../../../../../../entities/organizer"
import addressModel from "../../../model/address"
import organizerModel from "../../../model/organizer"

export const getAllorganizerAndaddress = async (): Promise<IorganizerAndAddress[] | undefined> => {
    try {
        const alldetails = await organizerModel.aggregate([
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

        console.log("all values: ", alldetails);
        return alldetails ? alldetails : undefined;
    } catch (error) {
        throw error;
    }
}

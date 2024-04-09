import userModel from "../../../model/userModel";


export const blockuser = async (id:string,usersModels: typeof userModel) : Promise < any | void > =>{
    try{
        console.log(" sldfkjsldkfslfdsj")
        const user = await usersModels.findById(id);
        if (user) {
            // Toggle the block field
            user.blocked = !user.blocked;

            const updatedUser = await user.save();

            console.log("Updated user:", updatedUser);

            return updatedUser;
        } else {
            console.log("User not found");
            return;
        }
    }catch(error){
        throw error
    }
}
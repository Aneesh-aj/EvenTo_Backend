import userModel from "../../../model/userModel"


export const uploadProfilePicture = async(id:string,image:string):Promise<boolean>=>{
    try{
        const user = await userModel.findByIdAndUpdate(id,{profileImage:image})
        return user? true: false
    }catch(error){
         throw error
    }
}
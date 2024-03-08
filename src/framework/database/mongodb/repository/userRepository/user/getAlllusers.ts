import userModel from "../../../model/userModel";


export const getAllusers = async (usersModel: typeof userModel) : Promise < any | void > =>{
    try{
        console.log("inside the repo")
         
         const org  = await userModel.find()
         if(org){
            return org
         }else{
            return
         }
    }catch(error){
        console.log("error in findemail ",error)
    }
}
import { Iadmin } from "../../../../../entities/admin";
import { IadminRepository } from "../../../../../usecases/interface/repositoryInterface/adminRepository";
import adminModel from "../../model/admin"; 



export class AdminRepository implements IadminRepository{
    async  findAdmin(email: string): Promise<Iadmin | void> {
           console.log("admin reepos entring")
          let admin = await adminModel.findOne({email})
            console.log("admin repos",admin)
          if(admin){
             return admin

          }else{
             return
          }
   }
}
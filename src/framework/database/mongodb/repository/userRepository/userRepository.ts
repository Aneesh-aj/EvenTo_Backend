import userModel  from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

import { IuserRepository } from "../../../../../usecases/interface/repositoryInterface/userRepository";

import {createUser,editAddress,editUserData,findbyEmail, getAddress, getUser, uploadProfilePicture} from './user/ index'
import { login } from "../../../../../usecases/usecases/user/login";
import { getAllusers } from "./user/getAlllusers";
import { blockuser } from "./user/block";
import { Iaddress } from "../../../../../entities/address";

export class userRepository implements IuserRepository{
    constructor(private userModels: typeof userModel){}
    async  createUser(newUser: Iuser): Promise<Iuser> {
        return await  createUser(newUser, this.userModels)
    }

    async findbyEmail(email: string): Promise<void | Iuser> {
        return await findbyEmail(this.userModels,email)
    }

    async  singup(email: string): Promise<string> {
        return "jiii"
    }
    async  getAllusers(): Promise<string> {
        return await getAllusers(this.userModels)
    }
    async  blockUser(id: string): Promise<any> {
        console.log("josjdfs hhhhheheheh")
        return await blockuser(id,userModel)
    }
    async  getUser(id: string): Promise<Iuser | undefined> {
        const user =  await getUser(id)
        return user ? user : undefined
    }

    async  getAddress(id: string): Promise<Iaddress | undefined> {
        const address = await getAddress(id)
        console.log("on the adresss")
        return address?address:undefined
    }
    async  editUserData(id: string, phoneNumber: string, name: string): Promise<Iuser | undefined> {
         const user = await editUserData(id,phoneNumber,name)
         return user?user : undefined
    }
    async  editAddress(id: string, country: string, state: string, city: string, pinCode: string): Promise<Iaddress | undefined> {
         const address = await editAddress(id,country,state,city,pinCode)
         console.log(" the rep add",address)
         return address?address:undefined
    }

    async  uploadProfilePicture(id: string, image: string): Promise<boolean> {
        const picture = await uploadProfilePicture(id,image)
        return picture
    }
}
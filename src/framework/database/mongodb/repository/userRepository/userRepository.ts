import userModel  from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

import { IuserRepository } from "../../../../../usecases/interface/repositoryInterface/userRepository";

import {createUser,findbyEmail, getUser} from './user/ index'
import { login } from "../../../../../usecases/usecases/user/login";
import { getAllusers } from "./user/getAlllusers";
import { blockuser } from "./user/block";

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
}
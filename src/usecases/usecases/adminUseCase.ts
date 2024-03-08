import { NextFunction } from "express";
import { IadminUsecase } from "../interface/usecase/adminUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { login } from "./admin/login";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository";
import { Iuserjwt } from "../interface/service/jwt";
import { Next } from "../../frameWork/types/serverPackageTypes";
import { getRequests } from "./admin/getRequests";
import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { getDetails } from "./admin/getDetails";
import { approve } from "./admin/approvelAccept";
import { reject } from "./admin/approvelReject";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { getAllusers } from "./admin/getAllUsers";
import { getAllorganizers } from "./admin/getAllOrganizers";
import { blockOrganizer } from "./admin/blockOrganizer";
import { blockUser } from "./admin/blockUser";

export class AdminUsecase implements IadminUsecase{
    private readonly hashpassword : Ihashpassword
    private readonly adminRepository : IadminRepository
    private readonly jwt : Iuserjwt
    private readonly organizerRepository : IorganizerRepository
    private readonly userRepoistory : IuserRepository
     constructor(hashpassword: Ihashpassword , adminRepository:IadminRepository,jwt:Iuserjwt,organizerRepository:IorganizerRepository,userRepository:IuserRepository){
         this.hashpassword = hashpassword
         this.adminRepository = adminRepository
         this.jwt = jwt
         this.organizerRepository =organizerRepository
         this.userRepoistory = userRepository
     }

   async  login({ email, password }: { email: string; password: string; }, next: NextFunction): Promise<any> {
       console.log(" in the usecase")
      let result = await  login(email,password,this.hashpassword,this.adminRepository,this.jwt)
       return result
    }

    async getRequests(next:Next):Promise <any | void>{
        let result = await getRequests(this.organizerRepository)
        return result
    }

    async getDetails(id:string,next:Next): Promise < any | void>{
        let result = await getDetails(this.organizerRepository,id)
      
        return result
    }

     async approve(id: string, next: NextFunction): Promise<any> {
        let result = await approve(this.organizerRepository,id)
        return result
    }

     async reject(id: string, next: NextFunction): Promise<any> {
        let result = await reject(this.organizerRepository,id)
        return result    
    }

    async  getAllusers(): Promise<any> {
        return await getAllusers(this.userRepoistory)
    }
    async  getAllorganizers(): Promise<any> {
        return await getAllorganizers(this.organizerRepository)
    }

    async  blockUsers(id: string, next: NextFunction): Promise<any> {
        return await blockUser(this.userRepoistory,id)
    }

    async  blockOrganizer(id: string, next: NextFunction): Promise<any> {
        return await blockOrganizer(this.organizerRepository,id)
    }
}
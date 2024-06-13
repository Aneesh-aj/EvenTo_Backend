import { NextFunction } from "express";
import { IadminUsecase } from "../interface/usecase/adminUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { login } from "./admin/login";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository";
import { Ijwt } from "../interface/service/jwt";
import { Next } from "../../framework/types/serverPackageTypes";

import { IorganizerRepository } from "../interface/repositoryInterface/organizerRepository";
import { getDetails } from "./admin/getDetails";
import { approve } from "./admin/approvelAccept";
import { reject } from "./admin/approvelReject";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { getAllusers } from "./admin/getAllUsers";
import { getAllorganizers } from "./admin/getAllOrganizers";
import { blockOrganizer } from "./admin/blockOrganizer";
import { blockUser } from "./admin/blockUser";
import { catchError } from "../middleares/catchError";
import { IeventCategory } from "../../entities/eventCategory";
import { IcategoryRepository } from "../interface/repositoryInterface/categoryRepository";
import { addCategory } from "./admin/addCategory";
import { getAllCategory } from "./admin/getAllcategory";
import { deleteCategory } from "./admin/deleteCategory";
import { activeCategory } from "./admin/activeCategory";
import { editCategory } from "./admin/editCategory";
import { getRequests } from "./admin/getRequests";
import { IrequestRepository } from "../interface/repositoryInterface/requestRepository";
import { fetchGraphData } from "./admin/fetchGraphData";
import { IeventRepository } from "../interface/repositoryInterface/eventRepository";
import { dashboard } from "./admin/dashboard";

export class AdminUsecase implements IadminUsecase {

    constructor(
        private hashpassword: Ihashpassword,
        private adminRepository: IadminRepository,
        private jwt: Ijwt,
        private organizerRepository: IorganizerRepository,
        private userRepository: IuserRepository,
        private categoryReopository:IcategoryRepository,
        private requestRepository:IrequestRepository,
        private eventRepository:IeventRepository
    ) { }

    async login({ email, password }: { email: string; password: string; }, next: Next): Promise<any | null> {
        try {
            const result = await login(email, password, this.hashpassword, this.adminRepository, this.jwt)
             return result
        } catch (error) {
            catchError(error, next)
        }
    }

    async getRequests(next: Next,): Promise<any | void> {
        try {
            const result = await getRequests(this.organizerRepository)
            return result
        } catch (error) {
            catchError(error, next)
        }
    }

    async getDetails(id: string, next: Next): Promise<any | void> {
        try {
            const result = await getDetails(this.organizerRepository, id)
            return result
        } catch (error) {
            catchError(error, next)
        }
    }

    async approve(id: string, next: Next): Promise<any> {
        try {
            const result = await approve(this.organizerRepository, id)
            return result

        } catch (error) {
            catchError(error, next)
        }
    }

    async reject(id: string, next: Next): Promise<any> {
        try {
            const result = await reject(this.organizerRepository, id)
            return result
        } catch (error) {
            catchError(error, next)
        }
    }

    async getAllusers(next: Next): Promise<any> {
        try {
            return await getAllusers(this.userRepository)
        } catch (error) {
            catchError(error, next)
        }
    }
    async getAllorganizers(next: Next): Promise<any> {
        try {
            return await getAllorganizers(this.organizerRepository)
        } catch (error) {
            catchError(error, next)
        }
    }

    async blockUsers(id: string, next: NextFunction): Promise<any> {
        try {
            return await blockUser(this.userRepository, id)
        } catch (error) {
            catchError(error, next)
        }
    }

    async blockOrganizer(id: string, next: NextFunction): Promise<any> {
        try {
            return await blockOrganizer(this.organizerRepository, id)
        } catch (error) {
            catchError(error, next)
        }
    }

    async addCategory(category: string, next: NextFunction): Promise<IeventCategory[] | undefined> {
        try{
            return await addCategory(category,this.categoryReopository)
           
        }catch(error){
            catchError(error,next)
        }
    }
    async getAllCategory( next: NextFunction): Promise<IeventCategory[] | undefined> {
        try{
            return await getAllCategory(this.categoryReopository)
           
        }catch(error){
            catchError(error,next)
        }
    }
    async deleteCategory(id:string, next: Next): Promise<IeventCategory[] | undefined> {
        try{
            return await deleteCategory(id,this.categoryReopository)
           
        }catch(error){
            catchError(error,next)
        }
    }
    async activeCategory(id:string, next: Next): Promise<IeventCategory[] | undefined> {
        try{
            return await activeCategory(id,this.categoryReopository)
           
        }catch(error){
            catchError(error,next)
        }
    }

    async  editCategory(id: string, category: string, next: NextFunction): Promise<IeventCategory[] | {success:boolean,message:string } | undefined> {
        try{
            return await editCategory(id,category,this.categoryReopository)
        }catch(error){
             catchError(error,next)
        }
    }


    async  fetchGraphData(next:Next): Promise<any> {
        try{

            const data = await fetchGraphData(this.eventRepository)
            return data

        }catch(error){
            catchError(error,next)
        }
    }

     async  dashBoardData(next: NextFunction): Promise<any> {
         try{
            const data = await dashboard(this.userRepository,this.organizerRepository,this.eventRepository)
             return data
         }catch(error){
            catchError(error,next)
         }
     }
}
import { NextFunction } from "express";
import { IadminUsecase } from "../interface/usecase/adminUseCase";
import { Ihashpassword } from "../interface/service/hashPassword";
import { login } from "./admin/login";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository";
import { Ijwt } from "../interface/service/jwt";
import { Next } from "../../framework/types/serverPackageTypes";
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
import { catchError } from "../middleares/catchError";

export class AdminUsecase implements IadminUsecase {

    constructor(
        private hashpassword: Ihashpassword,
        private adminRepository: IadminRepository,
        private jwt: Ijwt,
        private organizerRepository: IorganizerRepository,
        private userRepository: IuserRepository) { }

    async login({ email, password }: { email: string; password: string; }, next: NextFunction): Promise<any> {
        try {
            const result = await login(email, password, this.hashpassword, this.adminRepository, this.jwt)
            return result
        } catch (error) {
            catchError(error, next)
        }
    }

    async getRequests(next: Next): Promise<any | void> {
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
}
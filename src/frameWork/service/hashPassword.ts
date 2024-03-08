import { Ihashpassword } from "../../usecases/interface/service/hashPassword";
import bycrypt from 'bcryptjs'

export class Encrypt implements Ihashpassword{
    constructor(){}

    async  createHash(password: string): Promise<string> {
        const hashPassword = await  bycrypt.hash(password,10)
        return hashPassword
    }

    async  comparePassword(password: string, hashPassword: string): Promise<boolean> {
         const passwordMatch = await bycrypt.compare(password,hashPassword)
         return passwordMatch
    }
}
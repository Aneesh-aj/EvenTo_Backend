import { IorganizerRepository } from "../../interface/repositoryInterface/organizerRepository";

export const login = async (organizerRepository : IorganizerRepository,email:string, password: string) : Promise <string | void> =>{
     console.log("here at organizer Usecase Part of organizer usecase/orgnaizer/organizer.ts")
     const login = await organizerRepository.organizerLogin(email,password)
     
     if(login) return login
}
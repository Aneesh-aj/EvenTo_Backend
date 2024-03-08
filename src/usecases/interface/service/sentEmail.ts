export interface IsentEmail{
    sentEmailVerification(email:string,verification:string) : Promise < any >
}
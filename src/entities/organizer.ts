export interface Iorganizer {
    _id?:string,
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    ownerId: any,
    companyLicense: any,
    companyInsurance: any,
    bankPassbook: any,
    approved?:boolean,
    blocked?:boolean,

}
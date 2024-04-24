export interface Iorganizer {
    _id?:string,
    role?:string,
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
    backgroundImage?:string,
    profileImage?:string,
    about?:string,
    eventCategory?:[string],
}


export interface IorganizerAndAddress{
    _id?:string,
    role?:string,
    name: string,
    email: string,
    phoneNumber:string,
    password: string,
    ownerId: any,
    companyLicense: any,
    companyInsurance: any,
    bankPassbook: any,
    approved?:boolean,
    blocked?:boolean,
    backgroundImage?:string,
    profileImage?:string,
    about?:string,
    eventCategory?:[{
        id?:string
        category:string,
        delete:string,
        active:string
    }],
    address:{
        country:string,
        state:string,
        city:string,
        pincode?:number,
        building?:string,
        userId: string,
    }
}
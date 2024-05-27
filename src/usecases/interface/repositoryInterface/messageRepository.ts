export interface ImessageRepository{
     createMessage(senterId:string,receiverId:string,message:string,imageUrl:string):Promise<any>
}
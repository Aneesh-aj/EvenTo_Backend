import { IeventRepository } from "../../interface/repositoryInterface/eventRepository"

export const eventGraph= async(organizerId:string,eventRepository:IeventRepository)=>{
    try{
        const events = await eventRepository.getByOrganizer(organizerId);
        let data: { year: any; month: any; event: any; }[] = [];
        
        events?.forEach((event: any) => {
       
        
            const year = event.date.split(' ')[3];
            const month = event.date.split(' ')[1];
                const existingEntry = data.find(entry => entry.year === year && entry.month === month);
        
            if (existingEntry) {
                existingEntry.event += 1;
            } else {
                data.push({ year, month, event: 1 });
            }
        });
        
        console.log(data);
        
    
        console.log(" the data-----------",data)
        return data
    }catch(error){
        throw error
    }
}
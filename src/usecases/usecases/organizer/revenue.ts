import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const revenue = async(organizerId:string,eventRepository:IeventRepository):Promise<any>=>{
    try{

        const events = await eventRepository.getByOrganizer(organizerId);
        let data: { year: any; month: any; revenue: any; }[] = [];
        
        events?.forEach((event: any) => {
            const eventRevenue = event.seatArrangement?.reduce((seatSum: number, seat: any) => {
                return seat.booked ? seatSum += Number(event.paymentAmount) || 0 : seatSum;
            }, 0);
        
            const year = event.date.split(' ')[3];
            const month = event.date.split(' ')[1];
                const existingEntry = data.find(entry => entry.year === year && entry.month === month);
        
            if (existingEntry) {
                existingEntry.revenue += eventRevenue;
            } else {
                data.push({ year, month, revenue: eventRevenue });
            }
        });
        
        console.log(data);
        
    
        console.log(" the data-----------",data)

    }catch(error){
        throw error
    }
}
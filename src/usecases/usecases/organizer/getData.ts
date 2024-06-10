import { IeventPostRepository } from "../../interface/repositoryInterface/eventPostRepository";
import { IeventRepository } from "../../interface/repositoryInterface/eventRepository";

export const getData = async (
  organizerId: string,
  eventRepository: IeventRepository,
  eventPostRepository: IeventPostRepository
) => {
  try {
    const events = await eventRepository.getByOrganizer(organizerId);
    const completedEvents = events?.filter((event) => event.status === 'completed');
    const eventPosts = await eventPostRepository.getPostByOrganizerId(organizerId);
    const revenue = completedEvents?.reduce((sum: number, event: any) => {
        console.log(" first looop sum",sum)
      const eventRevenue = event.seatArrangement?.reduce((seatSum: number, seat: any) => {
         console.log(" second loop sum",seatSum,seat)
         console.log(" the payment amount and booked",Number(event?.paymentAmount),seat.paymentAmount,seat.booked)
        return seat.booked ? seatSum += Number(event.paymentAmount) || 0: seatSum;
      }, 0);

      return sum += (eventRevenue || 0);
    }, 0);


    console.log("Total revenue:", { events: events?.length || 0, eventPosts: eventPosts?.length || 0, totalRevenue: revenue || 0  });

    return { events: completedEvents?.length || 0, eventPosts: eventPosts?.length || 0, totalRevenue: revenue || 0  };



  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

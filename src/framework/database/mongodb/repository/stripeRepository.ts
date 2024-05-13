import { Istripe } from "../../../../usecases/interface/repositoryInterface/stripeRepository";
import stripe from "../../../service/stripe";


export class Stripe implements Istripe{

    async  payment(eventId: string, userId: string, seats: [], amount: string): Promise<any> {
        try{


            const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price_data: {
                      currency: 'inr',
                      product_data: {
                        name: "Event",
                      },
                      unit_amount: 2 *100,
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: 'http://localhost:5173/success',
                cancel_url: 'http://localhost:5173/cancel',
                billing_address_collection: 'required'
              });

            //   const date:Date = new Date(consultingDate)
            // await this.bookingRepository.createBookingRepo(amount,email,doctorId,treatmentId,subTreatmentId,date)
            console.log('stripe result---',session.url);
            return session.url;

        }catch(error){
            throw error
        }
    }

}